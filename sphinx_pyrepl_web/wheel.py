"""Build and resolve project wheels for autodoc REPL package preload."""

from __future__ import annotations

import os
import re
import subprocess
import sys
import tomllib
from configparser import ConfigParser
from pathlib import Path

from sphinx.application import Sphinx
from sphinx.errors import ConfigError
from sphinx.util import logging

PROJECT_SENTINEL = ":project:"
_PROJECT_MARKERS = ("pyproject.toml", "setup.cfg", "setup.py")
_SKIP_DIRS = frozenset(
    {
        ".git",
        ".hg",
        ".svn",
        ".tox",
        ".venv",
        "__pycache__",
        "build",
        "dist",
        "doc",
        "docs",
        "node_modules",
        "venv",
    }
)
logger = logging.getLogger(__name__)


def is_project_sentinel(value: object) -> bool:
    """Return True if *value* requests automatic project wheel resolution."""
    return value == PROJECT_SENTINEL


def _is_project_root(path: Path) -> bool:
    return any((path / marker).is_file() for marker in _PROJECT_MARKERS)


def find_project_root(confdir: Path, override: str | None = None) -> Path:
    """Locate the Python project root for wheel builds."""
    if override is not None:
        root = (confdir / override).resolve()
        if not _is_project_root(root):
            raise ConfigError(
                f"pyrepl_project_root {override!r} does not contain "
                f"pyproject.toml, setup.cfg, or setup.py "
                f"(resolved to {root})"
            )
        return root

    for candidate in (confdir, *confdir.parents):
        if _is_project_root(candidate):
            return candidate

    raise ConfigError(
        "pyrepl_autodoc_packages is ':project:' but no project root was found "
        f"searching upward from {confdir}"
    )


def read_distribution_name(project_root: Path) -> str:
    """Return the distribution name declared by the project."""
    pyproject = project_root / "pyproject.toml"
    if pyproject.is_file():
        data = tomllib.loads(pyproject.read_text(encoding="utf-8"))
        name = data.get("project", {}).get("name")
        if isinstance(name, str) and name:
            return name

    setup_cfg = project_root / "setup.cfg"
    if setup_cfg.is_file():
        parser = ConfigParser()
        parser.read(setup_cfg, encoding="utf-8")
        if parser.has_option("metadata", "name"):
            name = parser.get("metadata", "name")
            if name:
                return name

    raise ConfigError(
        f"could not determine distribution name from {project_root}"
    )


def normalize_distribution_name(name: str) -> str:
    """Normalize a distribution name for wheel filename matching."""
    return re.sub(r"[-_.]+", "_", name).lower()


def wheel_dir_path(confdir: Path, wheel_dir: str) -> Path:
    """Return the absolute wheel output directory."""
    return (confdir / wheel_dir).resolve()


def resolved_wheel_href(wheel_dir: str, wheel_name: str) -> str:
    """Return the Sphinx site path for a built wheel."""
    return f"{wheel_dir.rstrip('/')}/{wheel_name}"


def find_newest_wheel(wheel_dir: Path, distribution_name: str) -> Path | None:
    """Return the newest wheel matching *distribution_name*, if any."""
    normalized = normalize_distribution_name(distribution_name)
    matches = [
        wheel
        for wheel in wheel_dir.glob("*.whl")
        if normalize_distribution_name(wheel.name.split("-", 1)[0]) == normalized
    ]
    if not matches:
        return None
    return max(matches, key=lambda path: path.stat().st_mtime)


def project_latest_mtime(project_root: Path, *, wheel_dir: Path) -> float:
    """Return the latest mtime among project sources that affect wheels."""
    latest = 0.0
    for marker in _PROJECT_MARKERS:
        path = project_root / marker
        if path.is_file():
            latest = max(latest, path.stat().st_mtime)

    for path in project_root.rglob("*.py"):
        if wheel_dir in path.parents or path.parents[0] == wheel_dir:
            continue
        if _SKIP_DIRS.intersection(path.relative_to(project_root).parts):
            continue
        latest = max(latest, path.stat().st_mtime)

    return latest


def wheel_is_fresh(wheel_path: Path, project_root: Path, *, wheel_dir: Path) -> bool:
    """Return True if *wheel_path* is newer than relevant project sources."""
    if not wheel_path.is_file():
        return False
    # Compare whole seconds; subsecond utime precision varies across platforms.
    wheel_mtime = int(wheel_path.stat().st_mtime)
    project_mtime = int(project_latest_mtime(project_root, wheel_dir=wheel_dir))
    return wheel_mtime >= project_mtime


def _wheel_build_env() -> dict[str, str]:
    """Return a subprocess environment safe for ``pip wheel`` under strict warnings."""
    env = os.environ.copy()
    # CI sets PYTHONWARNINGS=error; pip's pkg_resources import emits DeprecationWarning.
    env.pop("PYTHONWARNINGS", None)
    return env


def build_wheel(project_root: Path, wheel_dir: Path) -> None:
    """Build a wheel for *project_root* into *wheel_dir*."""
    wheel_dir.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            [
                sys.executable,
                "-m",
                "pip",
                "wheel",
                str(project_root),
                "--no-deps",
                "-w",
                str(wheel_dir),
            ],
            check=True,
            capture_output=True,
            text=True,
            env=_wheel_build_env(),
        )
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or "").strip()
        raise ConfigError(
            f"failed to build project wheel for {project_root}: {detail}"
        ) from exc


def warn_if_wheel_dir_not_static(app: Sphinx, wheel_dir: str) -> None:
    """Warn when wheels will not be copied into HTML output."""
    static_paths = list(getattr(app.config, "html_static_path", None) or [])
    covered = any(
        wheel_dir == static_path
        or wheel_dir.startswith(f"{static_path.rstrip('/')}/")
        for static_path in static_paths
    )
    if covered:
        return
    logger.warning(
        "pyrepl wheel directory %r is not covered by html_static_path; "
        "add its parent directory so wheels are copied into HTML output",
        wheel_dir,
        type="pyrepl",
        subtype="wheel",
    )


def ensure_project_wheel(app: Sphinx) -> str:
    """Build or reuse a project wheel and return its Sphinx path."""
    confdir = Path(app.confdir)
    wheel_dir_setting = app.config.pyrepl_wheel_dir
    wheel_dir = wheel_dir_path(confdir, wheel_dir_setting)
    project_root = find_project_root(confdir, app.config.pyrepl_project_root)
    distribution_name = read_distribution_name(project_root)

    warn_if_wheel_dir_not_static(app, wheel_dir_setting)

    wheel_path = find_newest_wheel(wheel_dir, distribution_name)
    if wheel_path is None or not wheel_is_fresh(
        wheel_path, project_root, wheel_dir=wheel_dir
    ):
        logger.info(
            "building project wheel for %r into %s",
            distribution_name,
            wheel_dir,
            type="pyrepl",
            subtype="wheel",
        )
        build_wheel(project_root, wheel_dir)
        wheel_path = find_newest_wheel(wheel_dir, distribution_name)

    if wheel_path is None:
        raise ConfigError(
            f"project wheel for {distribution_name!r} was not found in {wheel_dir} "
            "after build"
        )

    logger.info(
        "using project wheel %s",
        wheel_path.name,
        type="pyrepl",
        subtype="wheel",
    )
    return resolved_wheel_href(wheel_dir_setting, wheel_path.name)


def ensure_project_wheel_on_init(app: Sphinx) -> None:
    """Resolve ``:project:`` before doctrees are read."""
    if not is_project_sentinel(app.config.pyrepl_autodoc_packages):
        return
    if app.builder.format != "html":
        return
    app._pyrepl_resolved_autodoc_packages = ensure_project_wheel(app)
