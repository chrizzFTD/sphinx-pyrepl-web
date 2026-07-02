import pytest
from sphinx_pytest.plugin import CreateDoctree


def test_basic(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"]})
    sphinx_doctree.buildername = "html"
    result = sphinx_doctree(
        """
Test
----

.. py-repl::
   :theme: catppuccin-latte
   :no-header:

.. py-repl::

    """
    )
    lines = [line.rstrip() for line in result.pformat().strip().splitlines()]
    lines[0] = lines[0].replace('pyrepl="True"', 'pyrepl="1"')
    assert lines == """
<document pyrepl="1" source="<src>/index.rst">
    <section ids="test" names="test">
        <title>
            Test
        <raw format="html" xml:space="preserve">
            <py-repl theme="catppuccin-latte" no-header></py-repl>
        <raw format="html" xml:space="preserve">
            <py-repl></py-repl>
    """.strip().splitlines()


def test_replay_file_flag(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf(
        {
            "extensions": ["sphinx_pyrepl_web"],
            "root_doc": "index",
        }
    )
    sphinx_doctree.buildername = "html"
    (sphinx_doctree.srcdir / "demo.py").write_text("print('hi')\n", encoding="utf-8")
    result = sphinx_doctree(
        """
.. py-repl::
   :src: demo.py
   :replay:
    """
    )
    html = result.pformat()
    assert 'src="demo.py"' in html
    assert "replay" in html


@pytest.mark.parametrize(
    "options,expected_fragments",
    [
        (":no-buttons:\n   :readonly:", ["no-buttons", "readonly"]),
        (":repl-title: My REPL", ['repl-title="My REPL"']),
    ],
    ids=["flag-options", "repl-title"],
)
def test_pyrepl_directive_options(
    sphinx_doctree: CreateDoctree, options, expected_fragments
):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"], "root_doc": "index"})
    sphinx_doctree.buildername = "html"
    (sphinx_doctree.srcdir / "demo.py").write_text("print('hi')\n", encoding="utf-8")
    result = sphinx_doctree(
        f"""
.. py-repl::
   {options}

   >>> 1 + 1
"""
    )
    html = result.pformat()
    for fragment in expected_fragments:
        assert fragment in html


def test_silent_src_omitted_without_body(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"], "root_doc": "index"})
    sphinx_doctree.buildername = "html"
    (sphinx_doctree.srcdir / "demo.py").write_text("print('hi')\n", encoding="utf-8")
    result = sphinx_doctree(
        """
.. py-repl::
   :silent:
   :src: demo.py
"""
    )
    html = result.pformat()
    assert 'src="demo.py"' not in html


def test_missing_src_file_reports_error(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"]})
    sphinx_doctree.buildername = "html"
    result = sphinx_doctree(
        """
.. py-repl::
   :src: missing.py
"""
    )
    assert "Could not read file" in result.warnings
