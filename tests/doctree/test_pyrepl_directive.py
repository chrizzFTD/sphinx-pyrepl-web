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
