"""Shared constants and Sphinx project setup helpers."""

import shutil
import sys
from pathlib import Path

from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = Path(__file__).resolve().parent / "fixtures"
WHEEL_NAME = "pyrepl_test_pkg-1.0.0-py3-none-any.whl"
WHEEL_PATH = f"_static/wheels/{WHEEL_NAME}"

sys.path.insert(0, str(ROOT))


def build_sphinx(
    srcdir: Path,
    outdir: Path,
    doctreedir: Path,
    *,
    parallel: int = 0,
    **kwargs,
) -> Sphinx:
    """Run a full Sphinx HTML build and return the application."""
    outdir.mkdir(parents=True, exist_ok=True)
    doctreedir.mkdir(parents=True, exist_ok=True)
    with open(outdir / "warnings.txt", "w", encoding="utf-8") as warning_file:
        app = Sphinx(
            srcdir=str(srcdir),
            confdir=str(srcdir),
            outdir=str(outdir),
            doctreedir=str(doctreedir),
            buildername="html",
            warning=warning_file,
            freshenv=True,
            parallel=parallel,
            **kwargs,
        )
        app.build()
    return app


def copy_wheel_to(srcdir: Path) -> Path:
    """Copy the test wheel into ``srcdir/_static/wheels`` and return that directory."""
    wheels_dir = srcdir / "_static" / "wheels"
    wheels_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(FIXTURES / "wheels" / WHEEL_NAME, wheels_dir / WHEEL_NAME)
    return wheels_dir


def wheel_conf_extra() -> str:
    """Return conf.py snippet enabling the test wheel for autodoc REPLs."""
    return f"""
html_static_path = ["_static"]
pyrepl_autodoc_packages = {WHEEL_PATH!r}
"""


def autodoc_conf_header(*, sys_path: str, extra: str = "") -> str:
    """Return a minimal autodoc-enabled conf.py header."""
    return f"""
import sys
sys.path.insert(0, {sys_path!r})
extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
pyrepl_doctest_blocks = "autodoc"
{extra}
"""


def pyrepl_conf_header(*, extra: str = "") -> str:
    """Return a minimal pyrepl-only conf.py header."""
    return f"""
extensions = ["sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
{extra}
"""
