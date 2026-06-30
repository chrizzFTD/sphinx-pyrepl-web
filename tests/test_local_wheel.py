import json
import shutil
import sys
from pathlib import Path

import pytest
from sphinx.application import Sphinx
from sphinx_pytest.plugin import CreateDoctree

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = Path(__file__).resolve().parent / "fixtures"
WHEEL_NAME = "pyrepl_test_pkg-1.0.0-py3-none-any.whl"
WHEEL_PATH = f"_static/wheels/{WHEEL_NAME}"

sys.path.insert(0, str(ROOT))


def _build_sphinx(srcdir: Path, outdir: Path, doctreedir: Path, **kwargs) -> Sphinx:
    outdir.mkdir(parents=True, exist_ok=True)
    doctreedir.mkdir(parents=True, exist_ok=True)
    with open(outdir / "warnings.txt", "w", encoding="utf-8") as warning_file:
        app = Sphinx(
            srcdir=str(srcdir),
            confdir=str(srcdir),
            outdir=str(outdir),
            doctreedir=str(doctreedir),
            buildername="html",
            warning=warning_file,
            freshenv=True,
            **kwargs,
        )
        app.build()
    return app


@pytest.fixture
def wheel_project(tmp_path):
    srcdir = tmp_path / "docs"
    wheels_dir = srcdir / "_static" / "wheels"
    wheels_dir.mkdir(parents=True)
    shutil.copy2(FIXTURES / "wheels" / WHEEL_NAME, wheels_dir / WHEEL_NAME)
    (srcdir / "_static" / "bootstrap.py").write_text(
        "# Optional post-install bootstrap for local wheel REPLs.\n",
        encoding="utf-8",
    )

    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        """
extensions = ["sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
html_static_path = ["_static"]
""",
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir


def test_local_wheel_packages_emitted_in_doctree(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"]})
    sphinx_doctree.buildername = "html"
    result = sphinx_doctree(
        f"""
.. py-repl::
   :packages: {WHEEL_PATH}
   :no-header:
"""
    )
    html = result.pformat()
    assert f'packages="{WHEEL_PATH}"' in html


def test_local_wheel_copied_to_output_tree(wheel_project):
    srcdir, outdir, doctreedir = wheel_project
    (srcdir / "index.rst").write_text(
        f"""
Example
=======

.. py-repl::
   :packages: {WHEEL_PATH}
   :no-header:
""",
        encoding="utf-8",
    )

    _build_sphinx(srcdir, outdir, doctreedir)

    wheel_out = outdir / "_static" / "wheels" / WHEEL_NAME
    assert wheel_out.is_file(), f"missing wheel at {wheel_out}"

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert "pyrepl.js" in html


def test_local_wheel_with_src_and_replay_body(wheel_project):
    srcdir, outdir, doctreedir = wheel_project
    (srcdir / "index.rst").write_text(
        f"""
Example
=======

.. py-repl::
   :packages: {WHEEL_PATH}
   :src: _static/bootstrap.py
   :repl-title: test
   :no-banner:

   >>> import pyrepl_test_pkg
   >>> pyrepl_test_pkg.ping()
""",
        encoding="utf-8",
    )

    app = _build_sphinx(srcdir, outdir, doctreedir)

    assert (outdir / "_static" / "wheels" / WHEEL_NAME).is_file()
    assert (outdir / "_static" / "bootstrap.py").is_file()

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) == 1
    script_name = next(iter(replay_files))
    assert (outdir / "_static" / "pyrepl" / script_name).is_file()

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'src="_static/bootstrap.py"' in html
    assert f'replay-src="_static/pyrepl/{script_name}"' in html


def test_comma_separated_local_wheel_and_pypi_package(sphinx_doctree: CreateDoctree):
    sphinx_doctree.set_conf({"extensions": ["sphinx_pyrepl_web"]})
    sphinx_doctree.buildername = "html"
    packages = f"numpy, {WHEEL_PATH}"
    result = sphinx_doctree(
        f"""
.. py-repl::
   :packages: {packages}
   :no-header:
"""
    )
    html = result.pformat()
    assert f'packages="{packages}"' in html
