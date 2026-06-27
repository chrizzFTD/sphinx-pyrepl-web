"""A Sphinx extension for embedding pyrepl-web Python REPLs in documentation."""

__version__ = "0.1.1"

import importlib
import inspect
import json
from doctest import DocTestParser
from pathlib import Path
import sys

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx import addnodes
from sphinx.application import Sphinx
from sphinx.util.docutils import SphinxDirective
from sphinx.util.fileutil import copy_asset_file

PYREPL_DIR = Path(__file__).parent / "pyrepl"
STARTUP_FILES_KEY = "pyrepl-startup-files"
REPLAY_FILES_KEY = "pyrepl-replay-files"
_DOCTEST_PARSER = DocTestParser()


def setup(app: Sphinx):
    """Setup the extension."""
    app.add_config_value("pyrepl_js", "../pyrepl.js", "env")
    app.add_config_value("pyrepl_doctest_blocks", "autodoc", "env")
    app.add_config_value("pyrepl_autodoc_bootstrap", True, "env")
    app.add_directive("py-repl", PyRepl)
    app.connect("doctree-read", doctree_read)
    app.connect("doctree-read", transform_doctest_blocks)
    app.connect("html-page-context", add_html_context)
    app.connect("env-updated", copy_asset_files)
    return {"version": __version__, "parallel_read_safe": True}


def extract_doctest_source(text: str) -> str:
    """Extract executable Python source from doctest-formatted text."""
    lines: list[str] = []
    for example in _DOCTEST_PARSER.get_examples(text):
        lines.extend(example.source.splitlines())
    if not lines:
        return ""
    return "\n".join(lines) + "\n"


def strip_doctest_prompts(lines: list[str]) -> list[str]:
    """Remove leading ``>>> `` / ``... `` prompts from doctest-style lines.

    Bare ``...`` lines (doctest block terminators with no trailing content) become
    blank lines, since they mark the end of a multi-line input block in the REPL.
    """
    result: list[str] = []
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith(">>> "):
            result.append(stripped[4:])
        elif stripped.startswith("..."):
            if stripped.startswith("... "):
                remainder = stripped[4:]
            else:
                remainder = stripped[3:]
            if remainder.strip() == "":
                result.append("")
            else:
                result.append(remainder)
        else:
            result.append(line)
    return result


def _next_replay_counter(replay_files: dict[str, str]) -> int:
    return sum(1 for name in replay_files if not name.endswith("-bootstrap.py")) + 1


def register_autodoc_repl(
    env,
    docname: str,
    replay_text: str,
    *,
    bootstrap_src: str | None = None,
    bootstrap_content: str | None = None,
) -> tuple[str, str | None]:
    """Record replay and optional bootstrap scripts, returning HTML src paths."""
    replay_files = json.loads(
        env.metadata[docname].setdefault(REPLAY_FILES_KEY, "{}")
    )
    counter = _next_replay_counter(replay_files)
    base = f"{docname.replace('/', '-')}-{counter}"
    replay_name = f"{base}.py"
    replay_files[replay_name] = replay_text

    startup_src = bootstrap_src
    if bootstrap_content is not None:
        bootstrap_name = f"{base}-bootstrap.py"
        replay_files[bootstrap_name] = bootstrap_content
        startup_src = f"_static/pyrepl/{bootstrap_name}"

    env.metadata[docname][REPLAY_FILES_KEY] = json.dumps(replay_files)
    return f"_static/pyrepl/{replay_name}", startup_src


def register_replay_script(env, docname: str, body_text: str) -> str:
    """Record a replay script in env metadata and return its replay-src path."""
    replay_src, _ = register_autodoc_repl(env, docname, body_text)
    return replay_src


def register_startup_file(env, docname: str, path: Path) -> str:
    """Track a startup script under srcdir for copying into HTML output."""
    env.note_dependency(path)
    rel_src = path.relative_to(Path(env.srcdir)).as_posix()
    startup_files = json.loads(
        env.metadata[docname].setdefault(STARTUP_FILES_KEY, "[]")
    )
    abs_path = str(path.resolve())
    if abs_path not in startup_files:
        startup_files.append(abs_path)
        env.metadata[docname][STARTUP_FILES_KEY] = json.dumps(startup_files)
    return rel_src


def make_pyrepl_raw(replay_src: str, src: str | None = None) -> nodes.raw:
    """Build a raw HTML node for an autodoc doctest replay widget."""
    attrs = ["no-header", "no-banner", f'replay-src="{replay_src}"']
    if src:
        attrs.insert(0, f'src="{src}"')
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


def _resolve_autodoc_bootstrap(
    app: Sphinx, env, docname: str, desc: addnodes.desc
) -> tuple[str | None, str | None]:
    """Return (startup src path, generated bootstrap content) for autodoc REPLs."""
    if not app.config.pyrepl_autodoc_bootstrap:
        return None, None

    sig = desc.next_node(addnodes.desc_signature)
    if sig is None:
        return None, None

    module_name = sig.get("module")
    fullname = sig.get("fullname")
    if not module_name:
        return None, None

    try:
        mod = sys.modules.get(module_name)
        if mod is None:
            mod = importlib.import_module(module_name)
        obj = mod
        if fullname:
            for part in fullname.split("."):
                obj = getattr(obj, part)
        mod_obj = inspect.getmodule(obj) or mod
        source_path = Path(inspect.getfile(mod_obj)).resolve()
        srcdir = Path(env.srcdir).resolve()
        try:
            source_path.relative_to(srcdir)
            return register_startup_file(env, docname, source_path), None
        except ValueError:
            return None, inspect.getsource(mod_obj) + "\n"
    except (AttributeError, ImportError, OSError, TypeError):
        return None, None


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
        source = extract_doctest_source(node.astext())
        if not source.strip():
            continue
        bootstrap_src = None
        bootstrap_content = None
        desc = _find_autodoc_desc(node)
        if desc is not None:
            bootstrap_src, bootstrap_content = _resolve_autodoc_bootstrap(
                app, env, docname, desc
            )
        replay_src, startup_src = register_autodoc_repl(
            env,
            docname,
            source,
            bootstrap_src=bootstrap_src,
            bootstrap_content=bootstrap_content,
        )
        node.replace_self(make_pyrepl_raw(replay_src, startup_src))
        replaced = True

    if replaced:
        env.metadata[docname]["pyrepl"] = True


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
            body_lines = strip_doctest_prompts(list(self.content))
            body_text = "\n".join(body_lines) + "\n"
            replay_src = register_replay_script(env, env.docname, body_text)
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
