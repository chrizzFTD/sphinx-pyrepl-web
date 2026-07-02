from sphinx_pytest.plugin import CreateDoctree

from helpers import assert_replay_artifacts, load_replay_files
from support import WHEEL_NAME, WHEEL_PATH, build_sphinx


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
