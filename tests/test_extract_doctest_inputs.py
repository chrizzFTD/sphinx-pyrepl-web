from sphinx_pyrepl_web.doctest import extract_doctest_inputs


def test_name_like_example():
    lines = [
        " >>> from naming import Name",
        " >>> class MyName(Name):",
        " ...     config = dict(base=r'\\w+')",
        " ...",
        " >>> n = MyName()",
        " >>> n.get()",
        " '{base}'",
        " >>> n.values",
        " {}",
        " >>> n.name = 'hello_world'",
        " >>> n",
        ' Name("hello_world")',
    ]
    assert extract_doctest_inputs(lines) == [
        " >>> from naming import Name",
        " >>> class MyName(Name):",
        " ...     config = dict(base=r'\\w+')",
        " ...",
        " >>> n = MyName()",
        " >>> n.get()",
        " >>> n.values",
        " >>> n.name = 'hello_world'",
        " >>> n",
    ]


def test_pipefile_list_output():
    lines = [
        " >>> [p.get(index=x, output='render') for x in range(10)]",
        " ['wipfile.render.7.0.ext',",
        "  'wipfile.render.7.1.ext',",
        "  'wipfile.render.7.2.ext',",
        "  'wipfile.render.7.3.ext',",
        "  'wipfile.render.7.4.ext',",
        "  'wipfile.render.7.5.ext',",
        "  'wipfile.render.7.6.ext',",
        "  'wipfile.render.7.7.ext',",
        "  'wipfile.render.7.8.ext',",
        "  'wipfile.render.7.9.ext']",
    ]
    assert extract_doctest_inputs(lines) == [
        " >>> [p.get(index=x, output='render') for x in range(10)]",
    ]


def test_pipefile_traceback_block():
    lines = [
        " >>> pf.year = 'nondigits'",
        " Traceback (most recent call last):",
        "  ...",
        " ValueError: Can't set field 'year' with invalid value 'nondigits'",
        " >>> pf.year = 1907",
        " >>> pf",
        ' ProjectFile("project_data_name_1907_christianl_constant_iamlast.data.17.abc")',
    ]
    assert extract_doctest_inputs(lines) == [
        " >>> pf.year = 'nondigits'",
        " >>> pf.year = 1907",
        " >>> pf",
    ]


def test_bare_terminator_preserved():
    lines = [
        ">>> class Foo:",
        "...     x = 1",
        "...",
        ">>> Foo()",
    ]
    assert extract_doctest_inputs(lines) == lines


def test_comment_input_line():
    lines = [
        " >>> n.name = 'hello_world'",
        " >>> n",
        ' Name("hello_world")',
        " >>> # modify name and get values from field names",
        " >>> n.base = 'through_field_name'",
    ]
    assert extract_doctest_inputs(lines) == [
        " >>> n.name = 'hello_world'",
        " >>> n",
        " >>> # modify name and get values from field names",
        " >>> n.base = 'through_field_name'",
    ]


def test_input_only_passthrough():
    lines = [
        ">>> x = 1",
        ">>> x + 1",
    ]
    assert extract_doctest_inputs(lines) == lines


def test_empty_block():
    assert extract_doctest_inputs([]) == []
