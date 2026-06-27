"""Demo module for autodoc doctest REPL integration."""


def example_generator(n):
    """Generators have a ``Yields`` section instead of a ``Returns`` section.

    Examples:
        Examples should be written in doctest format, and should illustrate how
        to use the function.

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    yield from range(n)
