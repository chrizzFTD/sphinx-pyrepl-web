import shutil
import sys
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from sphinx.application import Sphinx

from sphinx_pyrepl_web import _asset_href, _asset_href_packages

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


def _build_sphinx(srcdir: Path, outdir: Path, doctreedir: Path) -> Sphinx:
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
        )
        app.build()
    return app


@pytest.fixture
def html_builder(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    (srcdir / "conf.py").write_text("", encoding="utf-8")
    (srcdir / "index.rst").write_text("Test\n====\n", encoding="utf-8")
    (srcdir / "api").mkdir()
    (srcdir / "api" / "module.rst").write_text("API\n===\n", encoding="utf-8")
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    app = _build_sphinx(srcdir, outdir, doctreedir)
    return app.builder


def test_asset_href_rewrites_static_path_on_nested_page(html_builder):
    assert (
        _asset_href(html_builder, "api/module", "_static/wheels/foo.whl")
        == "../_static/wheels/foo.whl"
    )


def test_asset_href_leaves_root_page_static_path_unchanged(html_builder):
    assert (
        _asset_href(html_builder, "index", "_static/wheels/foo.whl")
        == "_static/wheels/foo.whl"
    )


def test_asset_href_leaves_root_absolute_path_unchanged(html_builder):
    assert (
        _asset_href(html_builder, "api/module", "/_static/wheels/foo.whl")
        == "/_static/wheels/foo.whl"
    )


def test_asset_href_leaves_https_url_unchanged(html_builder):
    url = "https://cdn.example/w.whl"
    assert _asset_href(html_builder, "api/module", url) == url


def test_asset_href_leaves_pypi_name_unchanged(html_builder):
    assert _asset_href(html_builder, "api/module", "numpy") == "numpy"


def test_asset_href_rewrites_src_relative_to_source_root(html_builder):
    assert _asset_href(html_builder, "api/module", "demo.py") == "../demo.py"


def test_asset_href_leaves_micropip_spec_unchanged(html_builder):
    spec = "mypkg @ https://example.com/wheels/mypkg.whl"
    assert _asset_href(html_builder, "api/module", spec) == spec


def test_asset_href_packages_rewrites_only_file_like_entries(html_builder):
    packages = "numpy, _static/wheels/foo.whl"
    assert _asset_href_packages(html_builder, "api/module", packages) == (
        "numpy, ../_static/wheels/foo.whl"
    )


def test_asset_href_skips_normalization_for_non_html_builder():
    builder = MagicMock()
    builder.format = ""
    assert (
        _asset_href(builder, "api/module", "_static/wheels/foo.whl")
        == "_static/wheels/foo.whl"
    )
