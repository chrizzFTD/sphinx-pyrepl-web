from unittest.mock import MagicMock, patch

import pytest

from sphinx_pyrepl_web.packages import (
    format_packages,
    is_project_entry,
    packages_include_project,
    parse_packages,
    resolve_packages,
    substitute_project,
)


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (":project:, grill-usd-core==26.8", [":project:", "grill-usd-core==26.8"]),
        (" :project: , numpy ", [":project:", "numpy"]),
        ([" :project:", "numpy"], [":project:", "numpy"]),
        ("", []),
        (None, []),
        ("numpy", ["numpy"]),
    ],
)
def test_parse_packages(value, expected):
    assert parse_packages(value) == expected


def test_format_packages():
    assert format_packages(["a", "b"]) == "a, b"


@pytest.mark.parametrize(
    ("entry", "expected"),
    [
        (":project:", True),
        (" :project: ", True),
        ("_static/wheels/foo.whl", False),
        ("numpy", False),
    ],
)
def test_is_project_entry(entry, expected):
    assert is_project_entry(entry) is expected


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (":project:, numpy", True),
        (":project:", True),
        ("numpy", False),
        ("_static/wheels/foo.whl", False),
        (None, False),
        ([" :project:", "numpy"], True),
    ],
)
def test_packages_include_project(value, expected):
    assert packages_include_project(value) is expected


def test_substitute_project_replaces_sentinel_only():
    wheel = "_static/wheels/demo-1.0.0-py3-none-any.whl"
    assert substitute_project(
        [":project:", "grill-usd-core==26.8"], wheel
    ) == [wheel, "grill-usd-core==26.8"]


def test_substitute_project_dedupes_repeated_project_entries():
    wheel = "_static/wheels/demo-1.0.0-py3-none-any.whl"
    assert substitute_project(
        [":project:", ":project:", "numpy"], wheel
    ) == [wheel, "numpy"]


def test_resolve_packages_without_project_sentinel():
    app = MagicMock()
    assert resolve_packages(app, "numpy, grill-names>=2.6.0") == (
        "numpy, grill-names>=2.6.0"
    )


def test_resolve_packages_substitutes_project_on_html_builder():
    app = MagicMock()
    app.builder.format = "html"
    wheel = "_static/wheels/demo-1.0.0-py3-none-any.whl"
    with patch(
        "sphinx_pyrepl_web.wheel.project_wheel_href", return_value=wheel
    ) as wheel_mock:
        resolved = resolve_packages(
            app, ":project:, grill-usd-core==26.8"
        )
    wheel_mock.assert_called_once_with(app)
    assert resolved == f"{wheel}, grill-usd-core==26.8"


def test_resolve_packages_leaves_sentinel_on_non_html_builder():
    app = MagicMock()
    app.builder.format = "latex"
    with patch("sphinx_pyrepl_web.wheel.project_wheel_href") as wheel_mock:
        resolved = resolve_packages(app, ":project:, numpy")
    wheel_mock.assert_not_called()
    assert resolved == ":project:, numpy"


def test_resolve_packages_empty_returns_none():
    app = MagicMock()
    assert resolve_packages(app, "") is None
    assert resolve_packages(app, None) is None
