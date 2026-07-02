import pytest

from helpers import assert_replay_artifacts
from support import build_sphinx


@pytest.fixture
def included_example_project(tmp_path):
    """Project where example content is included into index.rst (like RTD docs)."""
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        """
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "_static"))
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_pyrepl_web",
]
master_doc = "index"
pyrepl_js = "pyrepl.js"
pyrepl_doctest_blocks = "autodoc"
exclude_patterns = ["example.rst"]
""",
        encoding="utf-8",
    )
    (srcdir / "_static").mkdir()
    (srcdir / "_static" / "repl_include_demo.py").write_text(
        '''
def example_generator(n):
    """Example.

    Examples:
        >>> print(list(example_generator(2)))
        [0, 1]

    """
    yield from range(n)
'''.strip()
        + "\n",
        encoding="utf-8",
    )
    (srcdir / "example.rst").write_text(
        """
.. py-repl::
   :no-header:

   >>> 1 + 1

.. autofunction:: repl_include_demo.example_generator
""".strip()
        + "\n",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. include:: example.rst\n",
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir


def test_included_example_writes_all_replay_scripts(included_example_project):
    srcdir, outdir, doctreedir = included_example_project
    app = build_sphinx(srcdir, outdir, doctreedir)

    replay_files = assert_replay_artifacts(app, outdir, "index", count=2)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("replay-src=") == 2
    assert 'src="_static/repl_include_demo.py"' not in html

    for script_name in replay_files:
        script_path = outdir / "_static" / "pyrepl" / script_name
        assert script_path.is_file(), f"missing replay script at {script_path}"
