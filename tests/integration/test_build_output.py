from helpers import assert_replay_artifacts
from support import WHEEL_NAME, WHEEL_PATH, build_sphinx

from sphinx_pyrepl_web import PYREPL_DIR


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

    build_sphinx(srcdir, outdir, doctreedir)

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

    app = build_sphinx(srcdir, outdir, doctreedir)

    assert (outdir / "_static" / "wheels" / WHEEL_NAME).is_file()
    assert (outdir / "_static" / "bootstrap.py").is_file()

    replay_files = assert_replay_artifacts(app, outdir, "index", count=1)
    script_name = next(iter(replay_files))

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'src="_static/bootstrap.py"' in html
    assert f'replay-src="_static/pyrepl/{script_name}"' in html


def test_vendored_pyrepl_assets_copied(sphinx_project):
    srcdir, outdir, doctreedir = sphinx_project
    build_sphinx(srcdir, outdir, doctreedir)

    copied = {path.name for path in PYREPL_DIR.iterdir() if path.is_file()}
    assert copied
    for name in copied:
        assert (outdir / name).is_file(), f"missing vendored asset {name}"


def test_startup_src_deduplicated_on_build(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "shared.py").write_text("print('shared')\n", encoding="utf-8")
    (srcdir / "conf.py").write_text(
        """
extensions = ["sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
Example
=======

.. py-repl::
   :src: shared.py

.. py-repl::
   :src: shared.py
""",
        encoding="utf-8",
    )

    build_sphinx(srcdir, outdir, doctreedir)
    assert (outdir / "shared.py").is_file()
    assert (outdir / "shared.py").read_text(encoding="utf-8") == "print('shared')\n"
