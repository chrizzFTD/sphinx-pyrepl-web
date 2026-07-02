import pytest
from unittest.mock import MagicMock

from support import WHEEL_PATH
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
