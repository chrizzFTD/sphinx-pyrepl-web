from sphinx_pyrepl_web import (
    doctest_to_replay_source,
    extract_doctest_source,
    strip_doctest_prompts,
)


def test_doctest_to_replay_source_strips_expected_output():
    block = ">>> add(1, 2)\n3\n>>> add(0, 0)\n0"
    assert doctest_to_replay_source(block) == "add(1, 2)\n\nadd(0, 0)\n"


def test_extract_doctest_source_is_alias():
    block = ">>> print([i for i in example_generator(4)])\n[0, 1, 2, 3]"
    assert extract_doctest_source(block) == doctest_to_replay_source(block)


def test_doctest_to_replay_source_example_generator():
    block = ">>> print([i for i in example_generator(4)])\n[0, 1, 2, 3]"
    assert doctest_to_replay_source(block) == (
        "print([i for i in example_generator(4)])\n"
    )


def test_doctest_to_replay_source_multiline_class():
    block = ">>> class Foo:\n...     x = 1\n...\n>>> Foo()\n<Foo object>"
    assert doctest_to_replay_source(block) == "class Foo:\n    x = 1\n\nFoo()\n"


def test_doctest_to_replay_source_name_class_example():
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


def test_doctest_to_replay_source_from_directive_lines():
    lines = [
        ">>> class Foo:",
        "...     x = 1",
        "...",
        ">>> Foo()",
    ]
    assert doctest_to_replay_source(lines) == "class Foo:\n    x = 1\n\nFoo()\n"


def test_doctest_to_replay_source_empty():
    assert doctest_to_replay_source("not a doctest") == ""


def test_issue_7_multiline_class_with_bare_terminator():
    lines = [
        ">>> class Foo:",
        "...     x = 1",
        "...",
        ">>> Foo()",
    ]
    assert strip_doctest_prompts(lines) == [
        "class Foo:",
        "    x = 1",
        "",
        "Foo()",
    ]


def test_bare_terminator_with_trailing_whitespace():
    assert strip_doctest_prompts(["   ...  "]) == [""]


def test_continuation_line_preserved():
    assert strip_doctest_prompts(["...     x = 1"]) == ["    x = 1"]


def test_single_line_prompts():
    assert strip_doctest_prompts([">>> x = 1", ">>> x + 1"]) == ["x = 1", "x + 1"]


def test_explicit_ellipsis():
    assert doctest_to_replay_source([">>> ..."]) == "...\n"
