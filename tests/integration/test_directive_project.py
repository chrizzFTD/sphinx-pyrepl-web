from tests.helpers import pyrepl_tag
from tests.support import build_sphinx, project_root_conf_extra, pyrepl_conf_header


def test_directive_with_project_sentinel_builds_wheel(tmp_path):
    srcdir = tmp_path / "docs"
    srcdir.mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        pyrepl_conf_header(extra=project_root_conf_extra(srcdir=srcdir)),
        encoding="utf-8",
    )
    (srcdir / "index.rst").write_text(
        """
Example
=======

.. py-repl::
   :packages: :project:
   :no-header:
""",
        encoding="utf-8",
    )

    build_sphinx(srcdir, outdir, doctreedir)

    built_wheel = next((srcdir / "_static" / "wheels").glob("pyrepl_test_pkg-*.whl"))
    wheel_path = f"_static/wheels/{built_wheel.name}"
    html = (outdir / "index.html").read_text(encoding="utf-8")
    tag = pyrepl_tag(html)
    assert f'packages="{wheel_path}"' in tag
    assert (outdir / "_static" / "wheels" / built_wheel.name).is_file()
