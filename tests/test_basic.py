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
    assert (
        [line.rstrip() for line in result.pformat().strip().splitlines()]
        == """
<document pyrepl="1" source="<src>/index.rst">
    <section ids="test" names="test">
        <title>
            Test
        <raw format="html" xml:space="preserve">
            <py-repl theme="catppuccin-latte" no-header></py-repl>
        <raw format="html" xml:space="preserve">
            <py-repl></py-repl>
    """.strip().splitlines()
    )


def test_replay_body(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"]})
    sphinx_doctree.buildername = "html"
    result = sphinx_doctree(
        """
.. py-repl::
   :no-header:

   >>> x = 1
   >>> x + 1
    """
    )
    html = result.pformat()
    assert 'replay-src="_static/pyrepl/index-1.py"' in html


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
