import json
import shutil
import sys
from pathlib import Path
from unittest.mock import MagicMock

from sphinx.application import Sphinx

from sphinx_pyrepl_web import _autodoc_packages

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


def _wheel_conf_extra() -> str:
    return f"""
html_static_path = ["_static"]
pyrepl_autodoc_packages = {WHEEL_PATH!r}
"""


def test_autodoc_packages_emits_configured_wheel(tmp_path):
    wheels_dir = tmp_path / "docs" / "_static" / "wheels"
    wheels_dir.mkdir(parents=True)
    shutil.copy2(FIXTURES / "wheels" / WHEEL_NAME, wheels_dir / WHEEL_NAME)

    srcdir = tmp_path / "docs"
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        f"""
import sys
sys.path.insert(0, {str(FIXTURES / "pyrepl_test_pkg")!r})
extensions = ["sphinx.ext.autodoc", "sphinx.ext.napoleon", "sphinx_pyrepl_web"]
master_doc = "index"
pyrepl_js = "pyrepl.js"
pyrepl_doctest_blocks = "autodoc"
{_wheel_conf_extra()}
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. autofunction:: pyrepl_test_pkg.demo.example_generator\n",
        encoding="utf-8",
    )

    app = _build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    pyrepl_tag = html[html.index("<py-repl") : html.index("></py-repl>", html.index("<py-repl")) + len("></py-repl>")]
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in pyrepl_tag
    assert (outdir / "_static" / "wheels" / WHEEL_NAME).is_file()

    doctree = app.env.get_doctree("index")
    assert doctree.get("pyrepl")

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert list(replay_files) == ["index-1.py"]
    assert replay_files["index-1.py"] == (
        "print([i for i in example_generator(4)])\n"
    )

    bootstrap_files = json.loads(
        app.env.metadata["index"].get("pyrepl-bootstrap-files", "{}")
    )
    assert list(bootstrap_files) == ["index-1-bootstrap.py"]
    assert bootstrap_files["index-1-bootstrap.py"] == (
        "from pyrepl_test_pkg.demo import example_generator\n"
    )
    assert (outdir / "_static" / "pyrepl" / "index-1-bootstrap.py").is_file()


def test_autodoc_packages_for_out_of_tree_module(tmp_path):
    pkg_dir = tmp_path / "installed_pkg"
    pkg_dir.mkdir()
    (pkg_dir / "__init__.py").write_text(
        '''
class Widget:
    """A demo widget.

    Example:
        >>> w = Widget()
        >>> w.label
        'ready'

    """
    label = "ready"
'''.strip()
        + "\n",
        encoding="utf-8",
    )

    wheels_dir = tmp_path / "docs" / "_static" / "wheels"
    wheels_dir.mkdir(parents=True)
    shutil.copy2(FIXTURES / "wheels" / WHEEL_NAME, wheels_dir / WHEEL_NAME)

    srcdir = tmp_path / "docs"
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
{_wheel_conf_extra()}
""",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(".. autoclass:: installed_pkg.Widget\n", encoding="utf-8")

    app = _build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    pyrepl_tag = html[html.index("<py-repl") : html.index("></py-repl>", html.index("<py-repl")) + len("></py-repl>")]
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in pyrepl_tag

    bootstrap_files = json.loads(
        app.env.metadata["index"].get("pyrepl-bootstrap-files", "{}")
    )
    assert bootstrap_files["index-1-bootstrap.py"] == "from installed_pkg import Widget\n"


def test_autodoc_without_packages_is_replay_only(tmp_path):
    pkg_dir = tmp_path / "installed_pkg"
    pkg_dir.mkdir()
    (pkg_dir / "__init__.py").write_text(
        '''
class Widget:
    """A demo widget.

    Example:
        >>> w = Widget()
        >>> w.label
        'ready'

    """
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

    _build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    pyrepl_tag = html[html.index("<py-repl") : html.index("></py-repl>", html.index("<py-repl")) + len("></py-repl>")]
    assert 'packages="' not in pyrepl_tag
    assert ' src="' not in pyrepl_tag


def test_autodoc_packages_config_helper():
    app = MagicMock()
    app.config.pyrepl_autodoc_packages = WHEEL_PATH
    assert _autodoc_packages(app) == WHEEL_PATH

    app.config.pyrepl_autodoc_packages = ""
    assert _autodoc_packages(app) is None

    app.config.pyrepl_autodoc_packages = None
    assert _autodoc_packages(app) is None
