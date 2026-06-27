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
<document pyrepl="True" source="<src>/index.rst">
    <section ids="test" names="test">
        <title>
            Test
        <raw format="html" xml:space="preserve">
            <py-repl theme="catppuccin-latte" no-header></py-repl>
        <raw format="html" xml:space="preserve">
            <py-repl></py-repl>
    """.strip().splitlines()
    )
