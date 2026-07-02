from unittest.mock import MagicMock

from sphinx_pyrepl_web import _asset_href, _asset_href_packages


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
