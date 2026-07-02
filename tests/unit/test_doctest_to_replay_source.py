import pytest

from sphinx_pyrepl_web import doctest_to_replay_source

MULTILINE_CLASS_EXPECTED = "class Foo:\n    x = 1\n\nFoo()\n"


@pytest.mark.parametrize(
    ("source", "expected"),
    [
        (
            ">>> add(1, 2)\n3\n>>> add(0, 0)\n0",
            "add(1, 2)\n\nadd(0, 0)\n",
        ),
        (
            ">>> print([i for i in example_generator(4)])\n[0, 1, 2, 3]",
            "print([i for i in example_generator(4)])\n",
        ),
        (
            ">>> class Foo:\n...     x = 1\n...\n>>> Foo()\n<Foo object>",
            MULTILINE_CLASS_EXPECTED,
        ),
        (
            (
                ">>> from naming import Name\n"
                ">>> class MyName(Name):\n"
                "...     config = dict(base=r'\\w+')\n"
                "...\n"
                ">>> n = MyName()\n"
                "'{base}'"
            ),
            (
                "from naming import Name\n"
                "\n"
                "class MyName(Name):\n"
                "    config = dict(base=r'\\w+')\n"
                "\n"
                "n = MyName()\n"
            ),
        ),
        (
            [
                ">>> class Foo:",
                "...     x = 1",
                "...",
                ">>> Foo()",
            ],
            MULTILINE_CLASS_EXPECTED,
        ),
        ("not a doctest", ""),
        ([">>> ..."], "...\n"),
    ],
    ids=[
        "strips-output",
        "example-generator",
        "multiline-class",
        "name-class",
        "directive-lines",
        "non-doctest",
        "explicit-ellipsis",
    ],
)
def test_doctest_to_replay_source(source, expected):
    assert doctest_to_replay_source(source) == expected
