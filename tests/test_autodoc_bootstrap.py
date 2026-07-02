from helpers import load_bootstrap_files, load_replay_files, pyrepl_tag
from support import (
    FIXTURES,
    WHEEL_NAME,
    WHEEL_PATH,
    autodoc_conf_header,
    build_sphinx,
    copy_wheel_to,
    wheel_conf_extra,
)


def test_autodoc_packages_emits_configured_wheel(tmp_path):
    srcdir = tmp_path / "docs"
    copy_wheel_to(srcdir)
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        autodoc_conf_header(
            sys_path=str(FIXTURES / "pyrepl_test_pkg"),
            extra=wheel_conf_extra(),
        ),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. autofunction:: pyrepl_test_pkg.demo.example_generator\n",
        encoding="utf-8",
    )

    app = build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    tag = pyrepl_tag(html)
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in tag
    assert (outdir / "_static" / "wheels" / WHEEL_NAME).is_file()

    doctree = app.env.get_doctree("index")
    assert doctree.get("pyrepl")

    replay_files = load_replay_files(app, "index")
    assert list(replay_files) == ["index-1.py"]
    assert replay_files["index-1.py"] == (
        "print([i for i in example_generator(4)])\n"
    )

    bootstrap_files = load_bootstrap_files(app, "index")
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

    srcdir = tmp_path / "docs"
    copy_wheel_to(srcdir)
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        autodoc_conf_header(
            sys_path=str(pkg_dir.parent),
            extra=wheel_conf_extra(),
        ),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(".. autoclass:: installed_pkg.Widget\n", encoding="utf-8")

    app = build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{WHEEL_PATH}"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    tag = pyrepl_tag(html)
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in tag

    bootstrap_files = load_bootstrap_files(app, "index")
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
        autodoc_conf_header(sys_path=str(pkg_dir.parent)),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(".. autoclass:: installed_pkg.Widget\n", encoding="utf-8")

    build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    tag = pyrepl_tag(html)
    assert 'packages="' not in tag
    assert ' src="' not in tag
