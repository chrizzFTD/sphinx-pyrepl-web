import pytest
from sphinx_pytest.plugin import CreateDoctree

from fixtures.sources import AUTODOC_SCOPE_RST, EXAMPLE_GENERATOR_SOURCE


def _write_autodoc_conf(srcdir, scope) -> None:
    scope_literal = repr(scope)
    (srcdir / "conf.py").write_text(
        f"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_pyrepl_web",
]
pyrepl_doctest_blocks = {scope_literal}
pyrepl_js = "pyrepl.js"
""".strip()
        + "\n",
        encoding="utf-8",
    )


@pytest.fixture
def autodoc_doctree(sphinx_doctree: CreateDoctree):
    """Configure sphinx_doctree with an autodoc module and doctest scope RST."""
    (sphinx_doctree.srcdir / "repl_test_demo.py").write_text(
        EXAMPLE_GENERATOR_SOURCE,
        encoding="utf-8",
    )
    _write_autodoc_conf(sphinx_doctree.srcdir, "autodoc")
    sphinx_doctree.buildername = "html"
    return sphinx_doctree


def count_pyrepl_nodes(result) -> int:
    """Return the number of py-repl raw HTML nodes in a doctree result."""
    return result.pformat().count("<py-repl")


def test_autodoc_doctest_becomes_pyrepl(autodoc_doctree):
    result = autodoc_doctree(AUTODOC_SCOPE_RST)
    html = result.pformat()
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    assert 'packages="' not in html
    assert "no-header" in html
    assert "no-banner" in html


@pytest.mark.parametrize(
    ("scope", "expected_count"),
    [
        ("autodoc", 1),
        ("all", 2),
        (False, 0),
    ],
    ids=["autodoc-only", "all-doctests", "disabled"],
)
def test_doctest_scope(sphinx_doctree, scope, expected_count):
    (sphinx_doctree.srcdir / "repl_test_demo.py").write_text(
        EXAMPLE_GENERATOR_SOURCE,
        encoding="utf-8",
    )
    _write_autodoc_conf(sphinx_doctree.srcdir, scope)
    sphinx_doctree.buildername = "html"
    result = sphinx_doctree(AUTODOC_SCOPE_RST)
    assert count_pyrepl_nodes(result) == expected_count
