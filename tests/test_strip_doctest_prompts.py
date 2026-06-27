from sphinx_pyrepl_web import extract_doctest_source, strip_doctest_prompts


def test_extract_doctest_source_strips_expected_output():
    block = ">>> add(1, 2)\n3\n>>> add(0, 0)\n0"
    assert extract_doctest_source(block) == "add(1, 2)\nadd(0, 0)\n"


def test_extract_doctest_source_example_generator():
    block = ">>> print([i for i in example_generator(4)])\n[0, 1, 2, 3]"
    assert extract_doctest_source(block) == (
        "print([i for i in example_generator(4)])\n"
    )


def test_extract_doctest_source_multiline_class():
    block = ">>> class Foo:\n...     x = 1\n...\n>>> Foo()\n<Foo object>"
    assert extract_doctest_source(block) == "class Foo:\n    x = 1\nFoo()\n"


def test_extract_doctest_source_empty():
    assert extract_doctest_source("not a doctest") == ""


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
    assert strip_doctest_prompts([">>> ..."]) == ["..."]
