from unittest.mock import MagicMock

import pytest

from helpers import mock_html_builder
from sphinx_pyrepl_web import _asset_href, _asset_href_packages


@pytest.mark.parametrize(
    ("docname", "path", "expected"),
    [
        ("api/module", "_static/wheels/foo.whl", "../_static/wheels/foo.whl"),
        ("index", "_static/wheels/foo.whl", "_static/wheels/foo.whl"),
        ("api/module", "/_static/wheels/foo.whl", "/_static/wheels/foo.whl"),
        ("api/module", "https://cdn.example/w.whl", "https://cdn.example/w.whl"),
        ("api/module", "numpy", "numpy"),
        ("api/module", "demo.py", "../demo.py"),
        (
            "api/module",
            "mypkg @ https://example.com/wheels/mypkg.whl",
            "mypkg @ https://example.com/wheels/mypkg.whl",
        ),
    ],
    ids=[
        "nested-static",
        "root-static",
        "root-absolute",
        "https-url",
        "pypi-name",
        "src-relative",
        "micropip-spec",
    ],
)
def test_asset_href(docname, path, expected):
    builder = mock_html_builder()
    assert _asset_href(builder, docname, path) == expected


def test_asset_href_packages_rewrites_only_file_like_entries():
    builder = mock_html_builder()
    packages = "numpy, _static/wheels/foo.whl"
    assert _asset_href_packages(builder, "api/module", packages) == (
        "numpy, ../_static/wheels/foo.whl"
    )


def test_asset_href_skips_normalization_for_non_html_builder():
    builder = MagicMock()
    builder.format = ""
    assert (
        _asset_href(builder, "api/module", "_static/wheels/foo.whl")
        == "_static/wheels/foo.whl"
    )
