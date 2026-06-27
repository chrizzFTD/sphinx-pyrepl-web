import json
import sys
from pathlib import Path

import pytest
from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


@pytest.fixture
def sphinx_project(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        "extensions = ['sphinx_pyrepl_web']\n"
        "pyrepl_js = 'pyrepl.js'\n"
        "master_doc = 'index'\n",
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


def test_build_writes_replay_script_from_metadata(sphinx_project):
    srcdir, outdir, doctreedir = sphinx_project
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
        )
        app.build()

    replay_files = json.loads(app.env.metadata["index"].get("pyrepl-replay-files", "{}"))
    assert replay_files
    script_name = next(iter(replay_files))
    script_path = outdir / "_static" / "pyrepl" / script_name
    assert script_path.is_file(), f"missing replay script at {script_path}"
    assert "x = 2 + 2" in script_path.read_text(encoding="utf-8")

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'replay-src="_static/pyrepl/{script_name}"' in html


def test_build_writes_replay_script_with_parallel_read(sphinx_project):
    srcdir, outdir, doctreedir = sphinx_project
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
            parallel=2,
        )
        app.build()

    script_path = outdir / "_static" / "pyrepl" / "index-1.py"
    assert script_path.is_file(), f"missing replay script at {script_path}"


def test_build_omits_bare_doctest_terminator(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        "extensions = ['sphinx_pyrepl_web']\n"
        "pyrepl_js = 'pyrepl.js'\n"
        "master_doc = 'index'\n",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
Example
=======

.. py-repl::
   :no-header:

   >>> class Foo:
   ...     x = 1
   ...
   >>> Foo()
""".strip()
        + "\n",
        encoding="utf-8",
    )
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
        )
        app.build()

    script_path = outdir / "_static" / "pyrepl" / "index-1.py"
    script = script_path.read_text(encoding="utf-8")
    assert "class Foo:" in script
    assert "\n...\n" not in script
    assert "    x = 1\n\nFoo()" in script
