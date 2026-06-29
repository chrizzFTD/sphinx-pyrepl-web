from sphinx_pyrepl_web import doctest_to_replay_source


def test_strips_expected_output():
    block = ">>> add(1, 2)\n3\n>>> add(0, 0)\n0"
    assert doctest_to_replay_source(block) == "add(1, 2)\n\nadd(0, 0)\n"


def test_example_generator():
    block = ">>> print([i for i in example_generator(4)])\n[0, 1, 2, 3]"
    assert doctest_to_replay_source(block) == (
        "print([i for i in example_generator(4)])\n"
    )


def test_multiline_class():
    block = ">>> class Foo:\n...     x = 1\n...\n>>> Foo()\n<Foo object>"
    assert doctest_to_replay_source(block) == "class Foo:\n    x = 1\n\nFoo()\n"


def test_name_class_example():
    block = (
        ">>> from naming import Name\n"
        ">>> class MyName(Name):\n"
        "...     config = dict(base=r'\\w+')\n"
        "...\n"
        ">>> n = MyName()\n"
        "'{base}'"
    )
    assert doctest_to_replay_source(block) == (
        "from naming import Name\n"
        "\n"
        "class MyName(Name):\n"
        "    config = dict(base=r'\\w+')\n"
        "\n"
        "n = MyName()\n"
    )


def test_from_directive_lines():
    lines = [
        ">>> class Foo:",
        "...     x = 1",
        "...",
        ">>> Foo()",
    ]
    assert doctest_to_replay_source(lines) == "class Foo:\n    x = 1\n\nFoo()\n"


def test_empty_for_non_doctest():
    assert doctest_to_replay_source("not a doctest") == ""


def test_explicit_ellipsis():
    assert doctest_to_replay_source([">>> ..."]) == "...\n"
