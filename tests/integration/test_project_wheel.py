from tests.helpers import load_bootstrap_files, pyrepl_tag
from tests.support import (
    FIXTURES,
    autodoc_conf_header,
    build_sphinx,
    project_wheel_conf_extra,
)


def test_autodoc_with_project_sentinel_builds_wheel(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        autodoc_conf_header(
            sys_path=str(FIXTURES / "pyrepl_test_pkg"),
            extra=project_wheel_conf_extra(srcdir=srcdir),
        ),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. autofunction:: pyrepl_test_pkg.demo.example_generator\n",
        encoding="utf-8",
    )

    app = build_sphinx(srcdir, outdir, doctreedir)

    built_wheel = next((srcdir / "_static" / "wheels").glob("pyrepl_test_pkg-*.whl"))
    wheel_path = f"_static/wheels/{built_wheel.name}"
    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{wheel_path}"' in html
    assert 'replay-src="_static/pyrepl/index-1.py"' in html
    tag = pyrepl_tag(html)
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in tag
    assert (outdir / "_static" / "wheels" / built_wheel.name).is_file()
    assert built_wheel.is_file()
    assert (outdir / "_static" / "pyrepl" / "index-1.py").is_file()
    assert (outdir / "_static" / "pyrepl" / "index-1-bootstrap.py").is_file()
    assert app.env.get_doctree("index").get("pyrepl")
    assert list(load_bootstrap_files(app, "index")) == ["index-1-bootstrap.py"]


def test_autodoc_with_project_sentinel_and_extra_packages(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"
    extra_pkg = "extra-pkg>=1.0"

    (srcdir / "conf.py").write_text(
        autodoc_conf_header(
            sys_path=str(FIXTURES / "pyrepl_test_pkg"),
            extra=project_wheel_conf_extra(srcdir=srcdir).replace(
                'pyrepl_autodoc_packages = ":project:"',
                f'pyrepl_autodoc_packages = ":project:,{extra_pkg}"',
            ),
        ),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        ".. autofunction:: pyrepl_test_pkg.demo.example_generator\n",
        encoding="utf-8",
    )

    app = build_sphinx(srcdir, outdir, doctreedir)

    built_wheel = next((srcdir / "_static" / "wheels").glob("pyrepl_test_pkg-*.whl"))
    wheel_path = f"_static/wheels/{built_wheel.name}"
    html = (outdir / "index.html").read_text(encoding="utf-8")
    assert f'packages="{wheel_path}, {extra_pkg}"' in html
    assert 'src="_static/pyrepl/index-1-bootstrap.py"' in html
    assert app.env.get_doctree("index").get("pyrepl")
