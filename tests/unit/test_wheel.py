from __future__ import annotations

import os
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from sphinx.errors import ConfigError

from sphinx_pyrepl_web.wheel import (
    build_wheel,
    ensure_project_wheel,
    find_newest_wheel,
    find_project_root,
    normalize_distribution_name,
    project_latest_mtime,
    project_wheel_href,
    read_distribution_name,
    resolved_wheel_href,
    wheel_is_fresh,
)
from tests.support import FIXTURES

PKG_ROOT = FIXTURES / "pyrepl_test_pkg"


def test_project_wheel_href_caches_result(tmp_path):
    docs = tmp_path / "docs"
    docs.mkdir()
    app = MagicMock()
    app.confdir = str(docs)
    app.config.pyrepl_project_root = str(PKG_ROOT)
    app.config.pyrepl_wheel_dir = "_static/wheels"
    app.config.html_static_path = ["_static"]

    with patch("sphinx_pyrepl_web.wheel.ensure_project_wheel") as ensure_mock:
        ensure_mock.return_value = "_static/wheels/demo.whl"
        first = project_wheel_href(app)
        second = project_wheel_href(app)

    assert first == second == "_static/wheels/demo.whl"
    ensure_mock.assert_called_once_with(app)
    assert app._pyrepl_project_wheel_href == "_static/wheels/demo.whl"


def test_find_project_root_from_nested_confdir(tmp_path):
    project = tmp_path / "project"
    docs = project / "docs"
    docs.mkdir(parents=True)
    (project / "pyproject.toml").write_text(
        '[project]\nname = "demo"\nversion = "0.1.0"\n',
        encoding="utf-8",
    )
    assert find_project_root(docs) == project


def test_find_project_root_honors_override(tmp_path):
    pkg = tmp_path / "pkg"
    docs = tmp_path / "docs"
    docs.mkdir()
    pkg.mkdir()
    (pkg / "pyproject.toml").write_text(
        '[project]\nname = "demo"\nversion = "0.1.0"\n',
        encoding="utf-8",
    )
    assert find_project_root(docs, "../pkg") == pkg.resolve()


def test_find_project_root_invalid_override(tmp_path):
    docs = tmp_path / "docs"
    docs.mkdir()
    with pytest.raises(ConfigError, match="pyrepl_project_root"):
        find_project_root(docs, "../missing")


def test_read_distribution_name_from_fixture():
    assert read_distribution_name(PKG_ROOT) == "pyrepl_test_pkg"


def test_normalize_distribution_name():
    assert normalize_distribution_name("my-package") == "my_package"
    assert normalize_distribution_name("PyRepl.Test") == "pyrepl_test"


def test_find_newest_wheel_picks_latest(tmp_path):
    wheel_dir = tmp_path / "wheels"
    wheel_dir.mkdir()
    older = wheel_dir / "pyrepl_test_pkg-1.0.0-py3-none-any.whl"
    newer = wheel_dir / "pyrepl_test_pkg-2.0.0-py3-none-any.whl"
    older.write_bytes(b"old")
    newer.write_bytes(b"new")
    now = os.path.getmtime(newer)
    os.utime(older, (now - 10, now - 10))
    os.utime(newer, (now, now))
    assert find_newest_wheel(wheel_dir, "pyrepl_test_pkg") == newer


def test_resolved_wheel_href():
    assert (
        resolved_wheel_href("_static/wheels", "demo-1.0.0-py3-none-any.whl")
        == "_static/wheels/demo-1.0.0-py3-none-any.whl"
    )


def test_wheel_is_fresh_when_source_unchanged(tmp_path):
    project = tmp_path / "project"
    wheel_dir = tmp_path / "wheels"
    project.mkdir()
    wheel_dir.mkdir()
    (project / "pyproject.toml").write_text(
        '[project]\nname = "demo"\nversion = "1.0.0"\n',
        encoding="utf-8",
    )
    pkg = project / "demo_pkg"
    pkg.mkdir()
    source = pkg / "__init__.py"
    source.write_text("x = 1\n", encoding="utf-8")
    wheel = wheel_dir / "demo-1.0.0-py3-none-any.whl"
    wheel.write_bytes(b"wheel")
    assert wheel_is_fresh(wheel, project, wheel_dir=wheel_dir)


def test_wheel_is_stale_when_source_changes(tmp_path):
    project = tmp_path / "project"
    wheel_dir = tmp_path / "wheels"
    project.mkdir()
    wheel_dir.mkdir()
    (project / "pyproject.toml").write_text(
        '[project]\nname = "demo"\nversion = "1.0.0"\n',
        encoding="utf-8",
    )
    pkg = project / "demo_pkg"
    pkg.mkdir()
    source = pkg / "__init__.py"
    source.write_text("x = 1\n", encoding="utf-8")
    wheel = wheel_dir / "demo-1.0.0-py3-none-any.whl"
    wheel.write_bytes(b"wheel")
    source.write_text("x = 2\n", encoding="utf-8")
    now = os.path.getmtime(source)
    os.utime(wheel, (now - 10, now - 10))
    assert not wheel_is_fresh(wheel, project, wheel_dir=wheel_dir)


def test_build_wheel_creates_fixture_wheel(tmp_path, monkeypatch):
    monkeypatch.setenv("PYTHONWARNINGS", "error")
    wheel_dir = tmp_path / "wheels"
    build_wheel(PKG_ROOT, wheel_dir)
    wheel = find_newest_wheel(wheel_dir, "pyrepl_test_pkg")
    assert wheel is not None
    assert wheel.name.startswith("pyrepl_test_pkg-1.0.0-")
    assert wheel.name.endswith("-none-any.whl")


def test_ensure_project_wheel_builds_and_returns_path(tmp_path):
    docs = tmp_path / "docs"
    docs.mkdir()
    app = MagicMock()
    app.confdir = str(docs)
    app.config.pyrepl_project_root = str(PKG_ROOT)
    app.config.pyrepl_wheel_dir = "_static/wheels"
    app.config.html_static_path = ["_static"]

    path = ensure_project_wheel(app)

    assert path.startswith("_static/wheels/pyrepl_test_pkg-1.0.0-")
    assert path.endswith("-none-any.whl")
    assert (docs / "_static" / "wheels" / path.rsplit("/", 1)[-1]).is_file()


def test_ensure_project_wheel_reuses_fresh_wheel(tmp_path):
    docs = tmp_path / "docs"
    wheel_dir = docs / "_static" / "wheels"
    wheel_dir.mkdir(parents=True)
    wheel = wheel_dir / "pyrepl_test_pkg-1.0.0-py2.py3-none-any.whl"
    wheel.write_bytes(b"wheel")
    latest = project_latest_mtime(PKG_ROOT, wheel_dir=wheel_dir)
    os.utime(wheel, (latest + 10, latest + 10))

    app = MagicMock()
    app.confdir = str(docs)
    app.config.pyrepl_project_root = str(PKG_ROOT)
    app.config.pyrepl_wheel_dir = "_static/wheels"
    app.config.html_static_path = ["_static"]

    with patch("sphinx_pyrepl_web.wheel.build_wheel") as build_mock:
        first = ensure_project_wheel(app)
        second = ensure_project_wheel(app)

    assert first == second
    build_mock.assert_not_called()
