from helpers import assert_replay_artifacts
from support import build_sphinx, pyrepl_conf_header


def test_build_writes_replay_script_from_metadata(sphinx_project):
    srcdir, outdir, doctreedir = sphinx_project
    app = build_sphinx(srcdir, outdir, doctreedir)

    replay_files = assert_replay_artifacts(app, outdir, "index")
    script_name = next(iter(replay_files))
    script_path = outdir / "_static" / "pyrepl" / script_name
    assert "x = 2 + 2" in script_path.read_text(encoding="utf-8")

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'replay-src="_static/pyrepl/{script_name}"' in html


def test_build_writes_replay_script_with_parallel_read(sphinx_project):
    srcdir, outdir, doctreedir = sphinx_project
    build_sphinx(srcdir, outdir, doctreedir, parallel=2)

    script_path = outdir / "_static" / "pyrepl" / "index-1.py"
    assert script_path.is_file(), f"missing replay script at {script_path}"


def test_build_omits_bare_doctest_terminator(tmp_path):
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

   >>> class Foo:
   ...     x = 1
   ...
   >>> Foo()
""".strip()
        + "\n",
        encoding="utf-8",
    )
    build_sphinx(srcdir, outdir, doctreedir)

    script_path = outdir / "_static" / "pyrepl" / "index-1.py"
    script = script_path.read_text(encoding="utf-8")
    assert "class Foo:" in script
    assert "\n...\n" not in script
    assert "    x = 1\n\nFoo()" in script
