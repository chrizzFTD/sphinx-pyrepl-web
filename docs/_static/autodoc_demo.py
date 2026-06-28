"""Demo module for autodoc doctest REPL integration."""

def example_generator(n):
    """Generators yield values useful for iteration.

    Example:

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    yield from range(n)
