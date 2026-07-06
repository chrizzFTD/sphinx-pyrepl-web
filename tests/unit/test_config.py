import pytest
from unittest.mock import MagicMock

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
    app.config.pyrepl_autodoc_packages = configured
    assert _autodoc_packages(app) == expected


def test_autodoc_packages_uses_resolved_project_wheel():
    app = MagicMock()
    app.config.pyrepl_autodoc_packages = ":project:"
    app._pyrepl_resolved_autodoc_packages = WHEEL_PATH
    assert _autodoc_packages(app) == WHEEL_PATH
