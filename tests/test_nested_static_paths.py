from support import WHEEL_PATH, build_sphinx, copy_wheel_to, pyrepl_conf_header


def test_nested_page_emits_page_relative_static_paths(tmp_path):
    srcdir = tmp_path / "docs"
    copy_wheel_to(srcdir)
    (srcdir / "api").mkdir()
    outdir = tmp_path / "_build"
    doctreedir = tmp_path / "_doctree"

    (srcdir / "conf.py").write_text(
        pyrepl_conf_header(extra='html_static_path = ["_static"]\n'),
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

    app = build_sphinx(srcdir, outdir, doctreedir)

    html = (outdir / "api" / "index.html").read_text(encoding="utf-8")
    assert 'packages="../_static/wheels/' in html
    assert 'packages="api/_static/' not in html
    assert 'packages="/_static/' not in html
    assert 'replay-src="../_static/pyrepl/api-index-1.py"' in html

    root_html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "py-repl" not in root_html

    replay_files = app.env.metadata["api/index"].get("pyrepl-replay-files")
    assert replay_files is not None
