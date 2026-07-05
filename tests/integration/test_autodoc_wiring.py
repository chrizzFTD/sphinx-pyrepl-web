from tests.helpers import load_bootstrap_files, pyrepl_tag
from tests.support import (
    FIXTURES,
    WHEEL_NAME,
    WHEEL_PATH,
    autodoc_conf_header,
    build_sphinx,
    copy_wheel_to,
    wheel_conf_extra,
)


def test_autodoc_with_packages_writes_bootstrap_and_wheel(tmp_path):
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
    assert (outdir / "_static" / "pyrepl" / "index-1.py").is_file()
    assert (outdir / "_static" / "pyrepl" / "index-1-bootstrap.py").is_file()

    assert app.env.get_doctree("index").get("pyrepl")
    assert list(load_bootstrap_files(app, "index")) == ["index-1-bootstrap.py"]


def test_autodoc_without_packages_is_replay_only(tmp_path):
    from tests.fixtures.sources import WIDGET_SOURCE

    pkg_dir = tmp_path / "installed_pkg"
    pkg_dir.mkdir()
    (pkg_dir / "__init__.py").write_text(WIDGET_SOURCE, encoding="utf-8")

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
