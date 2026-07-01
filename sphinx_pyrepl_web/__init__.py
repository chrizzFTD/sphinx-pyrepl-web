"""A Sphinx extension for embedding pyrepl-web Python REPLs in documentation."""

__version__ = "0.2.0"

import json
from doctest import DocTestParser
from pathlib import Path

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx import addnodes
from sphinx.application import Sphinx
from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective
from sphinx.util.fileutil import copy_asset_file

PYREPL_DIR = Path(__file__).parent / "pyrepl"
STARTUP_FILES_KEY = "pyrepl-startup-files"
REPLAY_FILES_KEY = "pyrepl-replay-files"
BOOTSTRAP_FILES_KEY = "pyrepl-bootstrap-files"
_DOCTEST_PARSER = DocTestParser()
logger = logging.getLogger(__name__)


def setup(app: Sphinx):
    """Setup the extension."""
    app.add_config_value("pyrepl_js", "../pyrepl.js", "env")
    app.add_config_value("pyrepl_doctest_blocks", False, "env")
    app.add_config_value("pyrepl_autodoc_packages", None, "env")
    app.add_directive("py-repl", PyRepl)
    app.connect("doctree-read", doctree_read)
    app.connect("doctree-read", transform_doctest_blocks)
    app.connect("html-page-context", add_html_context)
    app.connect("env-updated", copy_asset_files)
    return {"version": __version__, "parallel_read_safe": True}


def doctest_to_replay_source(text_or_lines: str | list[str]) -> str:
    """Convert doctest-formatted text into executable replay script source."""
    text = (
        "\n".join(text_or_lines)
        if isinstance(text_or_lines, list)
        else text_or_lines
    )
    examples = _DOCTEST_PARSER.get_examples(text)
    if not examples:
        return ""
    parts = [example.source.rstrip("\n") for example in examples]
    return "\n\n".join(parts) + "\n"


def _next_replay_counter(replay_files: dict[str, str]) -> int:
    return len(replay_files) + 1


def register_autodoc_repl(
    env,
    docname: str,
    replay_text: str,
) -> tuple[str, str]:
    """Record a replay script in env metadata and return (replay-src path, name)."""
    replay_files = json.loads(
        env.metadata[docname].setdefault(REPLAY_FILES_KEY, "{}")
    )
    counter = _next_replay_counter(replay_files)
    replay_name = f"{docname.replace('/', '-')}-{counter}.py"
    replay_files[replay_name] = replay_text
    env.metadata[docname][REPLAY_FILES_KEY] = json.dumps(replay_files)
    return f"_static/pyrepl/{replay_name}", replay_name


def register_autodoc_bootstrap(
    env,
    docname: str,
    bootstrap_text: str,
    replay_name: str,
) -> str:
    """Record a silent bootstrap script paired with a replay file."""
    bootstrap_files = json.loads(
        env.metadata[docname].setdefault(BOOTSTRAP_FILES_KEY, "{}")
    )
    bootstrap_name = replay_name.replace(".py", "-bootstrap.py")
    bootstrap_files[bootstrap_name] = bootstrap_text
    env.metadata[docname][BOOTSTRAP_FILES_KEY] = json.dumps(bootstrap_files)
    return f"_static/pyrepl/{bootstrap_name}"


def autodoc_bootstrap_source(
    module: str | None,
    fullname: str | None,
    objtype: str | None,
) -> str | None:
    """Return a silent import script for the documented autodoc object."""
    if not module:
        return None

    if objtype == "module" or not fullname:
        return f"import {module}\n"

    if "." in fullname:
        root = fullname.split(".", 1)[0]
        return f"from {module} import {root}\n"

    return f"from {module} import {fullname}\n"


def make_pyrepl_raw(
    replay_src: str,
    packages: str | None = None,
) -> nodes.raw:
    """Build a raw HTML node for an autodoc doctest replay widget."""
    attrs = ["no-header", "no-banner", f'replay-src="{replay_src}"']
    if packages:
        attrs.insert(0, f'packages="{packages}"')
    attr_str = " ".join(attrs)
    return nodes.raw("", f"<py-repl {attr_str}></py-repl>\n", format="html")


def _find_autodoc_desc(node: nodes.Node) -> addnodes.desc | None:
    """Return the enclosing autodoc desc node, if any."""
    current = node.parent
    while current is not None:
        if isinstance(current, addnodes.desc):
            return current
        current = current.parent
    return None


def _autodoc_packages(app: Sphinx) -> str | None:
    """Return configured package preload for autodoc doctest REPLs."""
    return app.config.pyrepl_autodoc_packages or None


def _inside_autodoc_desc(node: nodes.Node) -> bool:
    """Return True if *node* is nested inside an autodoc desc entry."""
    return _find_autodoc_desc(node) is not None


def transform_doctest_blocks(app: Sphinx, doctree: nodes.document):
    """Replace doctest blocks with interactive py-repl widgets."""
    scope = app.config.pyrepl_doctest_blocks
    if not scope:
        return

    env = app.env
    docname = env.docname
    replaced = False
    for node in doctree.findall(nodes.doctest_block):
        if scope == "autodoc" and not _inside_autodoc_desc(node):
            continue
        source = doctest_to_replay_source(node.astext())
        if not source.strip():
            continue
        packages = None
        bootstrap_src = None
        desc = _find_autodoc_desc(node)
        if desc is not None:
            packages = _autodoc_packages(app)
        replay_src, replay_name = register_autodoc_repl(env, docname, source)
        if desc is not None and packages:
            sig = desc.next_node(addnodes.desc_signature)
            if sig is not None:
                bootstrap_text = autodoc_bootstrap_source(
                    sig.get("module"),
                    sig.get("fullname"),
                    desc.get("objtype"),
                )
                if bootstrap_text:
                    bootstrap_src = register_autodoc_bootstrap(
                        env, docname, bootstrap_text, replay_name
                    )
        node.replace_self(
            make_pyrepl_raw(replay_src, src=bootstrap_src, packages=packages)
        )
        replaced = True

    if replaced:
        env.metadata[docname]["pyrepl"] = True
        doctree["pyrepl"] = True


class PyRepl(SphinxDirective):
    """Embed a pyrepl-web ``<py-repl>`` element."""

    has_content = True
    option_spec = {
        "theme": directives.unchanged,
        "packages": directives.unchanged,
        "repl-title": directives.unchanged,
        "src": directives.path,
        "no-header": directives.flag,
        "no-buttons": directives.flag,
        "readonly": directives.flag,
        "no-banner": directives.flag,
        "replay": directives.flag,
        "silent": directives.flag,
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

        if "src" in self.options:
            _, abs_path = self.env.relfn2path(self.options["src"])
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
            body_text = doctest_to_replay_source(list(self.content))
            replay_src, _ = register_autodoc_repl(env, env.docname, body_text)
            attrs.append(f'replay-src="{replay_src}"')

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

        raw_bootstrap = metadata.get(BOOTSTRAP_FILES_KEY)
        if raw_bootstrap:
            bootstrap_files = json.loads(raw_bootstrap)
            for name, content in bootstrap_files.items():
                (replay_dest / name).write_text(content, encoding="utf-8")

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
