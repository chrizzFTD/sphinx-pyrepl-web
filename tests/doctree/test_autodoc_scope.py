import pytest
from sphinx_pytest.plugin import CreateDoctree

from fixtures.sources import AUTODOC_SCOPE_RST, EXAMPLE_GENERATOR_SOURCE


@pytest.fixture
def autodoc_doctree(sphinx_doctree: CreateDoctree):
    """Configure sphinx_doctree with an autodoc module and doctest scope RST."""
    (sphinx_doctree.srcdir / "repl_test_demo.py").write_text(
        EXAMPLE_GENERATOR_SOURCE,
        encoding="utf-8",
    )
    sphinx_doctree.set_conf(
        {
            "extensions": [
                "sphinx.ext.autodoc",
                "sphinx.ext.napoleon",
                "sphinx_pyrepl_web",
            ],
            "pyrepl_doctest_blocks": "autodoc",
            "pyrepl_js": "pyrepl.js",
        }
    )
    sphinx_doctree.buildername = "html"
    return sphinx_doctree


def count_pyrepl_nodes(doctree) -> int:
    """Return the number of py-repl raw HTML nodes in a doctree."""
    from docutils import nodes

    count = 0
    for node in doctree.traverse(nodes.raw):
        text = node.astext()
        if "<py-repl" in text:
            count += 1
    return count


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
def test_doctest_scope(autodoc_doctree, scope, expected_count):
    autodoc_doctree.set_conf(
        {
            "extensions": [
                "sphinx.ext.autodoc",
                "sphinx.ext.napoleon",
                "sphinx_pyrepl_web",
            ],
            "pyrepl_doctest_blocks": scope,
            "pyrepl_js": "pyrepl.js",
        }
    )
    result = autodoc_doctree(AUTODOC_SCOPE_RST)
    assert count_pyrepl_nodes(result) == expected_count
