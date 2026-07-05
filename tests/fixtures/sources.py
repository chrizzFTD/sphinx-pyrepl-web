"""Shared RST snippets and inline module sources for doctree tests."""

EXAMPLE_GENERATOR_SOURCE = '''
def example_generator(n):
    """Generators have a ``Yields`` section instead of a ``Returns`` section.

    Examples:
        Examples should be written in doctest format, and should illustrate how
        to use the function.

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    yield from range(n)
'''.strip() + "\n"

AUTODOC_SCOPE_RST = """
API
===

.. autofunction:: repl_test_demo.example_generator

Tutorial
========

Plain doctest (outside autodoc):

>>> x = 1
>>> x + 1
2
""".strip()

WIDGET_SOURCE = '''
class Widget:
    """A demo widget.

    Example:
        >>> w = Widget()
        >>> w.label
        'ready'

    """
    label = "ready"
'''.strip() + "\n"
