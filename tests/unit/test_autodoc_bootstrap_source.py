import pytest

from sphinx_pyrepl_web import autodoc_bootstrap_source


@pytest.mark.parametrize(
    ("module", "fullname", "objtype", "expected"),
    [
        (
            "pyrepl_test_pkg.demo",
            "example_generator",
            "function",
            "from pyrepl_test_pkg.demo import example_generator\n",
        ),
        (
            "installed_pkg",
            "Widget",
            "class",
            "from installed_pkg import Widget\n",
        ),
        (
            "pkg.mod",
            "Widget.label",
            "method",
            "from pkg.mod import Widget\n",
        ),
        (
            "pyrepl_test_pkg.demo",
            "",
            "module",
            "import pyrepl_test_pkg.demo\n",
        ),
        (None, "foo", "function", None),
    ],
    ids=["function", "class", "method", "module", "missing-module"],
)
def test_autodoc_bootstrap_source(module, fullname, objtype, expected):
    assert autodoc_bootstrap_source(module, fullname, objtype) == expected
