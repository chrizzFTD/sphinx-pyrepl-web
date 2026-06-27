import json
import py_compile
import sys
from pathlib import Path

import pytest
from sphinx.application import Sphinx

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


@pytest.fixture
def autodoc_project(tmp_path):
    srcdir = tmp_path / "docs"
    pkgdir = tmp_path / "mockpkg"
    srcdir.mkdir()
    pkgdir.mkdir()
    (pkgdir / "__init__.py").write_text(
        r'''
class Name:
    r"""Base class for name objects.

    Example:
     >>> from naming import Name
     >>> class MyName(Name):
     ...     config = dict(base=r'\w+')
     ...
     >>> n = MyName()
     >>> n.get()
     '{base}'
     >>> n.name = 'hello_world'
     >>> n
     Name("hello_world")
    """

class PipeFile:
    """Pipeline file example.

    Example:
     >>> from naming import PipeFile
     >>> pf = PipeFile('wipfile.7.ext')
     >>> pf.values
     {'base': 'wipfile', 'version': '7'}
     >>> pf.year = 'nondigits'
     Traceback (most recent call last):
      ...
     ValueError: invalid year
     >>> pf.year = 1907
    """
'''.strip()
        + "\n",
        encoding="utf-8",
    )

    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        f"import sys\n"
        f"sys.path.insert(0, {str(tmp_path)!r})\n"
        "extensions = ['sphinx.ext.autodoc', 'sphinx_pyrepl_web']\n"
        "pyrepl_js = 'pyrepl.js'\n"
        "master_doc = 'index'\n"
        "pyrepl_autodoc = True\n"
        "pyrepl_autodoc_packages = 'mockpkg'\n"
        "pyrepl_autodoc_sections = ['Example']\n"
        "pyrepl_autodoc_options = {'no-banner': True}\n",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
API
===

.. autoclass:: mockpkg.Name
   :members:

.. autoclass:: mockpkg.PipeFile
   :members:
""".strip()
        + "\n",
        encoding="utf-8",
    )
    return srcdir, outdir, doctreedir


def _build(srcdir, outdir, doctreedir, parallel=0):
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
            parallel=parallel,
        )
        app.build()
    return app


def test_build_autodoc_injects_pyrepl_and_replay_scripts(autodoc_project):
    srcdir, outdir, doctreedir = autodoc_project
    app = _build(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("<py-repl") >= 2
    assert 'packages="mockpkg"' in html
    assert "no-banner" in html

    replay_dir = outdir / "_static" / "pyrepl"
    scripts = sorted(replay_dir.glob("index-*.py"))
    assert len(scripts) >= 2

    for script in scripts:
        content = script.read_text(encoding="utf-8")
        assert ">>>" not in content
        assert "'{base}'" not in content
        assert "Traceback" not in content
        py_compile.compile(str(script), doraise=True)

    replay_files = json.loads(
        app.env.metadata["index"].get("pyrepl-replay-files", "{}")
    )
    assert len(replay_files) >= 2


def test_build_autodoc_disabled_by_default(tmp_path):
    srcdir = tmp_path / "docs"
    pkgdir = tmp_path / "mockpkg"
    srcdir.mkdir()
    pkgdir.mkdir()
    (pkgdir / "__init__.py").write_text(
        'class Name:\n    """Example:\n     >>> x = 1\n     1\n    """\n',
        encoding="utf-8",
    )
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    (srcdir / "conf.py").write_text(
        f"import sys\nsys.path.insert(0, {str(tmp_path)!r})\n"
        "extensions = ['sphinx.ext.autodoc', 'sphinx_pyrepl_web']\n"
        "pyrepl_js = 'pyrepl.js'\n"
        "master_doc = 'index'\n",
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. autoclass:: mockpkg.Name\n   :members:\n",
        encoding="utf-8",
    )
    app = _build(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "<py-repl" not in html
    assert app.env.metadata["index"].get("pyrepl-replay-files") is None
