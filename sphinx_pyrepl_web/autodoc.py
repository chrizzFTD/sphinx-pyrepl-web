"""Autodoc integration: convert docstring Example blocks to py-repl directives."""

from __future__ import annotations

import re
from typing import Any

from sphinx.application import Sphinx

from sphinx_pyrepl_web.doctest import _is_doctest_input_line, extract_doctest_inputs

# Common docstring section headers that end an Example doctest block.
_OTHER_SECTION_HEADERS = frozenset(
    {
        "Args",
        "Arguments",
        "Attributes",
        "Caution",
        "Danger",
        "Error",
        "Hint",
        "Important",
        "Keyword Args",
        "Keyword Arguments",
        "Methods",
        "Note",
        "Notes",
        "Parameters",
        "Raises",
        "Return",
        "Returns",
        "See Also",
        "Tip",
        "Todo",
        "Warning",
        "Warnings",
        "Warns",
        "Yield",
        "Yields",
    }
)

_DEFAULT_WHAT = frozenset({"class", "function", "method"})


def _section_header_pattern(sections: list[str]) -> re.Pattern[str]:
    names = "|".join(re.escape(section) for section in sections)
    return re.compile(rf"^\s*({names})\s*:?\s*$")


def _matches_configured_section(line: str, pattern: re.Pattern[str]) -> bool:
    return bool(pattern.match(line))


def _matches_other_section_header(line: str) -> bool:
    stripped = line.lstrip()
    if not stripped.endswith(":"):
        return False
    title = stripped[:-1].strip()
    return title in _OTHER_SECTION_HEADERS


def _collect_doctest_block(
    lines: list[str], start: int, section_pattern: re.Pattern[str]
) -> tuple[list[str], int]:
    """Return doctest block lines and index after the block."""
    block: list[str] = []
    block_started = False
    i = start

    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()

        if stripped == "":
            if block_started:
                block.append(line)
            i += 1
            continue

        if _matches_configured_section(line, section_pattern):
            break

        if _matches_other_section_header(stripped):
            break

        if _is_doctest_input_line(line):
            block_started = True
            block.append(line)
            i += 1
            continue

        if block_started and (line.startswith(" ") or line.startswith("\t")):
            block.append(line)
            i += 1
            continue

        break

    return block, i


def _has_primary_prompt(lines: list[str]) -> bool:
    return any(line.lstrip().startswith(">>>") for line in lines)


def format_pyrepl_directive(
    input_lines: list[str], options: dict[str, str | bool]
) -> list[str]:
    """Format a ``.. py-repl::`` directive block for injection into a docstring."""
    result = [".. py-repl::"]

    for key in sorted(options):
        value = options[key]
        if value is True:
            result.append(f"   :{key}:")
        elif value:
            result.append(f"   :{key}: {value}")

    if input_lines:
        result.append("")
        for line in input_lines:
            normalized = line.lstrip()
            result.append(f"   {normalized}" if normalized else "")

    return result


def transform_docstring_lines(
    lines: list[str],
    sections: list[str],
    options: dict[str, str | bool],
) -> None:
    """Replace configured Example sections with ``.. py-repl::`` directives in place."""
    section_pattern = _section_header_pattern(sections)
    i = 0

    while i < len(lines):
        line = lines[i]
        if not _matches_configured_section(line, section_pattern):
            i += 1
            continue

        header_line = line
        block, next_i = _collect_doctest_block(lines, i + 1, section_pattern)

        if not block or not _has_primary_prompt(block):
            i = next_i
            continue

        input_lines = extract_doctest_inputs(block)
        if not input_lines:
            i = next_i
            continue

        replacement = [header_line, ""] + format_pyrepl_directive(input_lines, options)
        lines[i:next_i] = replacement
        i += len(replacement)


def derive_packages(qualified_name: str) -> str:
    """Derive a PyPI/import package name from a documented object's qualified name."""
    if "." in qualified_name:
        return qualified_name.rsplit(".", 1)[0]
    return qualified_name


def process_autodoc_docstring(
    app: Sphinx,
    what: str,
    name: str,
    obj: Any,
    options: Any,
    lines: list[str],
) -> None:
    """Convert matching docstring Example blocks into ``.. py-repl::`` directives."""
    if what not in _DEFAULT_WHAT:
        return

    sections: list[str] = app.config.pyrepl_autodoc_sections
    if not sections:
        return

    directive_options: dict[str, str | bool] = dict(app.config.pyrepl_autodoc_options)
    packages = app.config.pyrepl_autodoc_packages
    if packages is None:
        packages = derive_packages(name)
    if packages:
        directive_options["packages"] = packages

    transform_docstring_lines(lines, sections, directive_options)


def register(app: Sphinx) -> None:
    """Register autodoc config values and hook when enabled."""
    app.add_config_value("pyrepl_autodoc", False, "env")
    app.add_config_value("pyrepl_autodoc_packages", None, "env")
    app.add_config_value("pyrepl_autodoc_sections", ["Example", "Examples"], "env")
    app.add_config_value("pyrepl_autodoc_options", {}, "env")

    if not app.config.pyrepl_autodoc:
        return

    if "sphinx.ext.autodoc" not in app.config.extensions:
        from sphinx.util import logging

        logger = logging.getLogger(__name__)
        logger.warning(
            "pyrepl_autodoc is enabled but sphinx.ext.autodoc is not loaded; "
            "autodoc integration will have no effect."
        )
        return

    app.connect("autodoc-process-docstring", process_autodoc_docstring)
