from sphinx_pyrepl_web.autodoc import (
    derive_packages,
    format_pyrepl_directive,
    transform_docstring_lines,
)


def test_format_pyrepl_directive_options_and_body():
    result = format_pyrepl_directive(
        [" >>> x = 1", " >>> x + 1"],
        {"no-banner": True, "packages": "naming"},
    )
    assert result == [
        ".. py-repl::",
        "   :no-banner:",
        "   :packages: naming",
        "",
        "   >>> x = 1",
        "   >>> x + 1",
    ]


def test_transform_docstring_injects_pyrepl():
    lines = [
        "Base class for name objects.",
        "",
        "Example:",
        " >>> from naming import Name",
        " >>> n = MyName()",
        " >>> n.get()",
        " '{base}'",
    ]
    transform_docstring_lines(
        lines,
        sections=["Example"],
        options={"no-banner": True, "packages": "naming"},
    )
    assert lines[2] == "Example:"
    assert lines[3] == ""
    assert lines[4] == ".. py-repl::"
    assert "   :packages: naming" in lines
    assert "   >>> from naming import Name" in lines
    assert "'{base}'" not in lines


def test_transform_docstring_leaves_non_example_unchanged():
    lines = [
        "A helper function.",
        "",
        "Returns:",
        "    A string value.",
    ]
    original = list(lines)
    transform_docstring_lines(lines, sections=["Example"], options={})
    assert lines == original


def test_transform_docstring_skips_example_without_doctest():
    lines = [
        "Example:",
        "Use this class for naming things.",
    ]
    original = list(lines)
    transform_docstring_lines(lines, sections=["Example"], options={})
    assert lines == original


def test_transform_docstring_pipefile_traceback():
    lines = [
        "Example:",
        " >>> pf.year = 'nondigits'",
        " Traceback (most recent call last):",
        "  ...",
        " ValueError: invalid",
        " >>> pf.year = 1907",
    ]
    transform_docstring_lines(
        lines,
        sections=["Example"],
        options={"packages": "naming", "no-banner": True},
    )
    body = "\n".join(lines)
    assert ".. py-repl::" in body
    assert "Traceback" not in body
    assert "ValueError" not in body
    assert "   >>> pf.year = 'nondigits'" in lines
    assert "   >>> pf.year = 1907" in lines


def test_derive_packages():
    assert derive_packages("naming.Name") == "naming"
    assert derive_packages("naming") == "naming"
