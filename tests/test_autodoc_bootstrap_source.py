from sphinx_pyrepl_web import autodoc_bootstrap_source


def test_function_import():
    assert autodoc_bootstrap_source(
        "pyrepl_test_pkg.demo", "example_generator", "function"
    ) == "from pyrepl_test_pkg.demo import example_generator\n"


def test_class_import():
    assert autodoc_bootstrap_source("installed_pkg", "Widget", "class") == (
        "from installed_pkg import Widget\n"
    )


def test_method_imports_outer_class():
    assert autodoc_bootstrap_source("pkg.mod", "Widget.label", "method") == (
        "from pkg.mod import Widget\n"
    )


def test_module_import():
    assert autodoc_bootstrap_source("pyrepl_test_pkg.demo", "", "module") == (
        "import pyrepl_test_pkg.demo\n"
    )


def test_missing_module_returns_none():
    assert autodoc_bootstrap_source(None, "foo", "function") is None
