import json
import sys
from pathlib import Path

from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


def test_autodoc_bootstrap_uses_srcdir_module(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    (srcdir / "_static").mkdir()
    (srcdir / "_static" / "demo.py").write_text(
        '''
def greet():
    """Say hello.

    Examples:
        >>> greet()
        'hi'

    """
    return "hi"
'''.strip()
        + "\n",
        encoding="utf-8",
    )
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        """
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "_static"))
extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(".. autofunction:: demo.greet\n", encoding="utf-8")

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

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert 'src="_static/demo.py"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    assert (outdir / "_static" / "demo.py").is_file()

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert list(replay_files) == ["index-1.py"]
