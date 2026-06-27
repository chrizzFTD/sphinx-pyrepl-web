from sphinx_pyrepl_web import strip_doctest_prompts


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
