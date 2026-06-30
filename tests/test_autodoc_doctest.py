import json
from pathlib import Path

import pytest
from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]

EXAMPLE_GENERATOR_SOURCE = '''
def example_generator(n):
    """Generators have a ``Yields`` section instead of a ``Returns`` section.

    Examples:
        Examples should be written in doctest format, and should illustrate how
        to use the function.

        >>> print([i for i in example_generator(4)])
        [0, 1, 2, 3]

    """
    yield from range(n)
'''.strip() + "\n"


@pytest.fixture
def autodoc_project(tmp_path):
    mod_dir = tmp_path / "pkg"
    mod_dir.mkdir()
    (mod_dir / "repl_test_demo.py").write_text(EXAMPLE_GENERATOR_SOURCE, encoding="utf-8")

    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        f"""
import sys
sys.path.insert(0, {str(mod_dir)!r})
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_pyrepl_web",
]
master_doc = "index"
pyrepl_js = "pyrepl.js"
pyrepl_doctest_blocks = "autodoc"
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
API
===

.. autofunction:: repl_test_demo.example_generator

Tutorial
========

Plain doctest (outside autodoc):

>>> x = 1
>>> x + 1
2
""".strip()
        + "\n",
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir, mod_dir


def _build_sphinx(srcdir, outdir, doctreedir, **kwargs):
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


def test_autodoc_doctest_becomes_pyrepl(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    app = _build_sphinx(srcdir, outdir, doctreedir)

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) == 1
    script_name = next(iter(replay_files))
    script = replay_files[script_name]
    assert script == "print([i for i in example_generator(4)])\n"
    assert "[0, 1, 2, 3]" not in script

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'replay-src="_static/pyrepl/{script_name}"' in html
    assert 'packages="' not in html
    assert "no-header" in html
    assert "no-banner" in html

    script_path = outdir / "_static" / "pyrepl" / script_name
    assert script_path.is_file(), f"missing replay script at {script_path}"


def test_autodoc_scope_skips_plain_rst_doctest(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    app = _build_sphinx(srcdir, outdir, doctreedir)

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) == 1

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("replay-src=") == 1


def test_all_scope_transforms_plain_rst_doctest(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    conf = (srcdir / "conf.py").read_text(encoding="utf-8")
    (srcdir / "conf.py").write_text(
        conf + '\npyrepl_doctest_blocks = "all"\n', encoding="utf-8"
    )
    app = _build_sphinx(srcdir, outdir, doctreedir)

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) == 2

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("replay-src=") == 2


def test_default_scope_leaves_doctest_static(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    conf = (srcdir / "conf.py").read_text(encoding="utf-8")
    (srcdir / "conf.py").write_text(
        conf.replace('pyrepl_doctest_blocks = "autodoc"\n', ""), encoding="utf-8"
    )
    app = _build_sphinx(srcdir, outdir, doctreedir)

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert replay_files == {}

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "replay-src=" not in html
