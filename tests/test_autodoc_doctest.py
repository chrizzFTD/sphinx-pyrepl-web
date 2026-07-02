import pytest

from helpers import assert_replay_artifacts, load_replay_files
from support import autodoc_conf_header, build_sphinx

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
        autodoc_conf_header(sys_path=str(mod_dir)),
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


def test_autodoc_doctest_becomes_pyrepl(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    app = build_sphinx(srcdir, outdir, doctreedir)

    replay_files = assert_replay_artifacts(app, outdir, "index", count=1)
    script_name = next(iter(replay_files))
    script = replay_files[script_name]
    assert script == "print([i for i in example_generator(4)])\n"
    assert "[0, 1, 2, 3]" not in script

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'replay-src="_static/pyrepl/{script_name}"' in html
    assert 'packages="' not in html
    assert "no-header" in html
    assert "no-banner" in html


def test_autodoc_scope_skips_plain_rst_doctest(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    app = build_sphinx(srcdir, outdir, doctreedir)

    assert len(load_replay_files(app, "index")) == 1

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("replay-src=") == 1


def test_all_scope_transforms_plain_rst_doctest(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    conf = (srcdir / "conf.py").read_text(encoding="utf-8")
    (srcdir / "conf.py").write_text(
        conf + '\npyrepl_doctest_blocks = "all"\n', encoding="utf-8"
    )
    app = build_sphinx(srcdir, outdir, doctreedir)

    assert len(load_replay_files(app, "index")) == 2

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert html.count("replay-src=") == 2


def test_default_scope_leaves_doctest_static(autodoc_project):
    srcdir, outdir, doctreedir, _ = autodoc_project
    conf = (srcdir / "conf.py").read_text(encoding="utf-8")
    (srcdir / "conf.py").write_text(
        conf.replace('pyrepl_doctest_blocks = "autodoc"\n', ""), encoding="utf-8"
    )
    app = build_sphinx(srcdir, outdir, doctreedir)

    assert load_replay_files(app, "index") == {}

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "replay-src=" not in html
