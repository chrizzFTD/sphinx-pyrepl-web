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
pyrepl_doctest_blocks = "autodoc"
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
    assert "pyrepl.js" in html
    assert (outdir / "_static" / "demo.py").is_file()

    doctree = app.env.get_doctree("index")
    assert doctree.get("pyrepl")

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert list(replay_files) == ["index-1.py"]


def test_autodoc_bootstrap_uses_packages_for_installed_module(tmp_path):
    pkg_dir = tmp_path / "installed_pkg"
    pkg_dir.mkdir()
    (pkg_dir / "__init__.py").write_text(
        '''
from .core import Widget as _Widget

class Widget(_Widget):
    """A demo widget.

    Example:
        >>> w = Widget()
        >>> w.label
        'ready'

    """
    pass
'''.strip()
        + "\n",
        encoding="utf-8",
    )
    (pkg_dir / "core.py").write_text(
        '''
class Widget:
    label = "ready"
'''.strip()
        + "\n",
        encoding="utf-8",
    )

    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        f"""
import sys
sys.path.insert(0, {str(pkg_dir.parent)!r})
extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
pyrepl_doctest_blocks = "autodoc"
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(".. autoclass:: installed_pkg.Widget\n", encoding="utf-8")

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
    assert 'packages="installed_pkg"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    assert "<py-repl" in html
    pyrepl_tag = html[html.index("<py-repl") : html.index("></py-repl>", html.index("<py-repl")) + len("></py-repl>")]
    assert ' src="' not in pyrepl_tag

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) == 1
    script = next(iter(replay_files.values()))
    assert script == "w = Widget()\n\nw.label\n"
