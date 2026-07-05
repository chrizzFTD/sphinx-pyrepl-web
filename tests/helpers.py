"""Shared assertion helpers for sphinx-pyrepl-web tests."""

import json
from pathlib import Path
from unittest.mock import MagicMock

from sphinx.application import Sphinx


def mock_html_builder(docname: str = "api/module") -> MagicMock:
    """Return a mock HTML builder whose target URIs match a nested page layout."""
    builder = MagicMock()
    builder.format = "html"

    def get_target_uri(name: str) -> str:
        if name == "index":
            return "index.html"
        return f"{name}.html"

    builder.get_target_uri.side_effect = get_target_uri
    return builder


def pyrepl_tag(html: str) -> str:
    """Extract the first ``<py-repl ...></py-repl>`` tag from HTML."""
    start = html.index("<py-repl")
    end = html.index("></py-repl>", start) + len("></py-repl>")
    return html[start:end]


def load_replay_files(app: Sphinx, docname: str) -> dict[str, str]:
    """Load replay script metadata for a document."""
    return json.loads(
        app.env.metadata[docname].get("pyrepl-replay-files", "{}")
    )


def load_bootstrap_files(app: Sphinx, docname: str) -> dict[str, str]:
    """Load bootstrap script metadata for a document."""
    return json.loads(
        app.env.metadata[docname].get("pyrepl-bootstrap-files", "{}")
    )


def assert_replay_artifacts(
    app: Sphinx,
    outdir: Path,
    docname: str,
    *,
    count: int | None = None,
    html: str | None = None,
) -> dict[str, str]:
    """Assert replay metadata, on-disk scripts, and optional HTML references."""
    replay_files = load_replay_files(app, docname)
    if count is not None:
        assert len(replay_files) == count

    for script_name in replay_files:
        script_path = outdir / "_static" / "pyrepl" / script_name
        assert script_path.is_file(), f"missing replay script at {script_path}"
        if html is not None:
            assert f'replay-src="_static/pyrepl/{script_name}"' in html

    return replay_files
