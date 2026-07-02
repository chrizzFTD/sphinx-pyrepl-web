import json
from unittest.mock import MagicMock

from docutils import nodes
from docutils.utils import new_document

from sphinx_pyrepl_web import REPLAY_FILES_KEY, copy_asset_files, transform_doctest_blocks


def test_copy_asset_files_skips_non_html_builder():
    app = MagicMock()
    app.builder.format = "latex"
    copy_asset_files(app, None)
    app.builder.outdir.__truediv__.assert_not_called()


def test_copy_asset_files_skips_empty_replay_metadata(tmp_path):
    app = MagicMock()
    app.builder.format = "html"
    app.builder.outdir = str(tmp_path / "out")
    app.env.metadata = {"index": {REPLAY_FILES_KEY: json.dumps({})}}
    copy_asset_files(app, None)
    assert not (tmp_path / "out" / "_static" / "pyrepl").exists()


def test_transform_skips_empty_converted_doctest():
    app = MagicMock()
    app.config.pyrepl_doctest_blocks = "all"
    app.env.docname = "index"
    app.env.metadata = {"index": {}}
    app.builder.format = "html"

    doctree = new_document("<test>")
    block = nodes.doctest_block("", "")
    doctree += block

    transform_doctest_blocks(app, doctree)
    assert len(list(doctree.findall(nodes.doctest_block))) == 1
    assert len(list(doctree.findall(nodes.raw))) == 0
