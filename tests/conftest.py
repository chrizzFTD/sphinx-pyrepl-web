"""Shared pytest fixtures."""

import pytest

from support import (
    FIXTURES,
    WHEEL_NAME,
    WHEEL_PATH,
    build_sphinx,
    copy_wheel_to,
    pyrepl_conf_header,
)


@pytest.fixture
def wheel_paths():
    """Paths to the vendored test wheel fixture."""
    return FIXTURES / "wheels", WHEEL_NAME, WHEEL_PATH


@pytest.fixture
def sphinx_project(tmp_path):
    """Minimal Sphinx project with a py-repl directive body."""
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        pyrepl_conf_header(),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
Example
=======

.. py-repl::
   :no-header:

   >>> x = 2 + 2
   >>> print(x)
""".strip()
        + "\n",
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir


@pytest.fixture
def wheel_project(tmp_path):
    """Sphinx project with the test wheel and bootstrap script in _static."""
    srcdir = tmp_path / "docs"
    copy_wheel_to(srcdir)
    (srcdir / "_static" / "bootstrap.py").write_text(
        "# Optional post-install bootstrap for local wheel REPLs.\n",
        encoding="utf-8",
    )
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        pyrepl_conf_header(extra='html_static_path = ["_static"]\n'),
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir
