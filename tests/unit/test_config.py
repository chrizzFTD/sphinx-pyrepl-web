import pytest
from unittest.mock import MagicMock, patch

from tests.support import WHEEL_PATH
from sphinx_pyrepl_web import _autodoc_packages


@pytest.mark.parametrize(
    ("configured", "expected"),
    [
        (WHEEL_PATH, WHEEL_PATH),
        ("", None),
        (None, None),
    ],
    ids=["wheel-path", "empty-string", "none"],
)
def test_autodoc_packages(configured, expected):
    app = MagicMock()
    app.builder.format = "html"
    app.config.pyrepl_autodoc_packages = configured
    assert _autodoc_packages(app) == expected


def test_autodoc_packages_resolves_project_with_extra_packages():
    app = MagicMock()
    app.builder.format = "html"
    app.config.pyrepl_autodoc_packages = ":project:, numpy"
    with patch(
        "sphinx_pyrepl_web.wheel.project_wheel_href", return_value=WHEEL_PATH
    ) as wheel_mock:
        assert _autodoc_packages(app) == f"{WHEEL_PATH}, numpy"
    wheel_mock.assert_called_once_with(app)
