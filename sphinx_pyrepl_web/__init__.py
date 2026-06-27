"""A Sphinx extension for embedding pyrepl-web Python REPLs in documentation."""

__version__ = "0.1.0"

import json
from pathlib import Path

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.application import Sphinx
from sphinx.util.docutils import SphinxDirective
from sphinx.util.fileutil import copy_asset_file

PYREPL_DIR = Path(__file__).parent / "pyrepl"
STARTUP_FILES_KEY = "pyrepl-startup-files"
REPLAY_FILES_KEY = "pyrepl-replay-files"
DEBUG_LOG_PATH = Path(__file__).resolve().parents[1] / "debug-e838cf.log"


def _debug_log(location: str, message: str, data: dict, hypothesis_id: str) -> None:
    # #region agent log
    import time

    entry = {
        "sessionId": "e838cf",
        "timestamp": int(time.time() * 1000),
        "location": location,
        "message": message,
        "data": data,
        "hypothesisId": hypothesis_id,
    }
    with open(DEBUG_LOG_PATH, "a", encoding="utf-8") as log_file:
        log_file.write(json.dumps(entry) + "\n")
    # #endregion


def setup(app: Sphinx):
    """Setup the extension."""
    app.add_config_value("pyrepl_js", "../pyrepl.js", "env")
    app.add_directive("py-repl", PyRepl)
    app.connect("doctree-read", doctree_read)
    app.connect("html-page-context", add_html_context)
    app.connect("env-updated", copy_asset_files)
    return {"version": __version__, "parallel_read_safe": True}


def strip_doctest_prompts(lines: list[str]) -> list[str]:
    """Remove leading ``>>> `` / ``... `` prompts from doctest-style lines."""
    result: list[str] = []
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith(">>> "):
            result.append(stripped[4:])
        elif stripped.startswith("... "):
            result.append(stripped[4:])
        else:
            result.append(line)
    return result


class PyRepl(SphinxDirective):
    """Embed a pyrepl-web ``<py-repl>`` element."""

    has_content = True
    option_spec = {
        "theme": directives.unchanged,
        "packages": directives.unchanged,
        "repl-title": directives.unchanged,
        "file": directives.path,
        "no-header": directives.flag,
        "no-buttons": directives.flag,
        "readonly": directives.flag,
        "no-banner": directives.flag,
        "replay": directives.flag,
        "silent": directives.flag,
        "strip-prompts": directives.flag,
    }

    def run(self):
        env = self.env
        attrs: list[str] = []

        for option, attr in (
            ("theme", "theme"),
            ("packages", "packages"),
            ("repl-title", "repl-title"),
        ):
            if option in self.options:
                value = self.options[option]
                attrs.append(f'{attr}="{value}"')

        for flag in ("no-header", "no-buttons", "readonly", "no-banner"):
            if flag in self.options:
                attrs.append(flag)

        has_body = bool(self.content)
        force_replay = "replay" in self.options
        force_silent = "silent" in self.options

        if "file" in self.options:
            _, abs_path = self.env.relfn2path(self.options["file"])
            path = Path(abs_path)
            try:
                path.read_text(encoding="utf-8")
            except OSError as exc:
                raise self.error(f"Could not read file: {exc}") from exc
            self.env.note_dependency(path)
            rel_src = path.relative_to(Path(self.env.srcdir)).as_posix()
            startup_files = json.loads(
                self.env.metadata[self.env.docname].setdefault(
                    STARTUP_FILES_KEY, "[]"
                )
            )
            startup_files.append(str(path))
            self.env.metadata[self.env.docname][STARTUP_FILES_KEY] = json.dumps(
                startup_files
            )

            if force_replay and not has_body:
                attrs.append(f'src="{rel_src}"')
                attrs.append("replay")
            elif not (force_silent and not has_body):
                attrs.append(f'src="{rel_src}"')

        if has_body:
            body_lines = strip_doctest_prompts(list(self.content))
            body_text = "\n".join(body_lines) + "\n"

            replay_files = json.loads(
                self.env.metadata[self.env.docname].setdefault(REPLAY_FILES_KEY, "{}")
            )
            counter = len(replay_files) + 1
            script_name = f"{env.docname.replace('/', '-')}-{counter}.py"
            replay_files[script_name] = body_text
            self.env.metadata[self.env.docname][REPLAY_FILES_KEY] = json.dumps(
                replay_files
            )
            replay_src = f"_static/pyrepl/{script_name}"
            attrs.append(f'replay-src="{replay_src}"')
            _debug_log(
                "PyRepl.run",
                "registered replay script in metadata",
                {
                    "docname": env.docname,
                    "script_name": script_name,
                    "replay_src": replay_src,
                    "body_len": len(body_text),
                },
                "H2",
            )

        self.env.metadata[self.env.docname]["pyrepl"] = True
        attr_str = (" " + " ".join(attrs)) if attrs else ""
        return [nodes.raw("", f"<py-repl{attr_str}></py-repl>\n", format="html")]


def doctree_read(app: Sphinx, doctree: nodes.document):
    """Mark pages that use the py-repl directive."""
    if app.env.metadata[app.env.docname].get("pyrepl"):
        doctree["pyrepl"] = True


def add_html_context(
    app: Sphinx, pagename: str, templatename: str, context, doctree: nodes.document
):
    """Load pyrepl-web JavaScript on pages that contain a REPL."""
    if doctree and "pyrepl" in doctree:
        app.add_js_file(app.config.pyrepl_js)


def copy_asset_files(app, _):
    """Copy vendored pyrepl assets and startup scripts into HTML output."""
    if app.builder.format != "html":
        return

    outdir = Path(app.builder.outdir)
    if PYREPL_DIR.is_dir():
        for asset in PYREPL_DIR.iterdir():
            if asset.is_file():
                copy_asset_file(str(asset.resolve()), str(outdir.resolve()))

    replay_dest = outdir / "_static" / "pyrepl"
    written_replay_files: list[str] = []
    for docname, metadata in app.env.metadata.items():
        raw = metadata.get(REPLAY_FILES_KEY)
        if not raw:
            continue
        replay_files = json.loads(raw)
        if not replay_files:
            continue
        replay_dest.mkdir(parents=True, exist_ok=True)
        for name, content in replay_files.items():
            (replay_dest / name).write_text(content, encoding="utf-8")
            written_replay_files.append(name)

    _debug_log(
        "copy_asset_files",
        "wrote replay scripts from metadata",
        {
            "outdir": str(outdir),
            "written_count": len(written_replay_files),
            "written_files": written_replay_files,
            "metadata_docs_with_replay": sum(
                1 for meta in app.env.metadata.values() if meta.get(REPLAY_FILES_KEY)
            ),
        },
        "H1",
    )

    srcdir = Path(app.builder.srcdir)
    copied = set()
    for docname, metadata in app.env.metadata.items():
        raw = metadata.get(STARTUP_FILES_KEY)
        if not raw:
            continue
        for abs_path in json.loads(raw):
            path = Path(abs_path)
            key = str(path.resolve())
            if key in copied:
                continue
            copied.add(key)
            rel = path.relative_to(srcdir)
            dest = outdir / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            copy_asset_file(str(path.resolve()), str(dest.resolve()))
