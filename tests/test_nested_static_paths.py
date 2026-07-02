import shutil
import sys
from pathlib import Path

from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = Path(__file__).resolve().parent / "fixtures"
WHEEL_NAME = "pyrepl_test_pkg-1.0.0-py3-none-any.whl"
WHEEL_PATH = f"_static/wheels/{WHEEL_NAME}"

sys.path.insert(0, str(ROOT))


def _build_sphinx(srcdir: Path, outdir: Path, doctreedir: Path) -> Sphinx:
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
    return app


def test_nested_page_emits_page_relative_static_paths(tmp_path):
    srcdir = tmp_path / "docs"
    wheels_dir = srcdir / "_static" / "wheels"
    wheels_dir.mkdir(parents=True)
    shutil.copy2(FIXTURES / "wheels" / WHEEL_NAME, wheels_dir / WHEEL_NAME)
    (srcdir / "api").mkdir()
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
    (srcdir / "index.rst").write_text("Home\n====\n", encoding="utf-8")
    (srcdir / "api" / "index.rst").write_text(
        f"""
API
===

.. py-repl::
   :packages: {WHEEL_PATH}
   :no-header:

   >>> 1 + 1
""",
        encoding="utf-8",
    )

    app = _build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "api" / "index.html").read_text(encoding="utf-8")
    assert 'packages="../_static/wheels/' in html
    assert 'packages="api/_static/' not in html
    assert 'packages="/_static/' not in html
    assert 'replay-src="../_static/pyrepl/api-index-1.py"' in html

    root_html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "py-repl" not in root_html

    replay_files = app.env.metadata["api/index"].get("pyrepl-replay-files")
    assert replay_files is not None
