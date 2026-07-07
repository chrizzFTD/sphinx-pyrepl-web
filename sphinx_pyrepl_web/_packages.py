"""Parse and resolve comma-separated REPL package specifications."""

from __future__ import annotations

from collections.abc import Sequence
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from sphinx.application import Sphinx

PROJECT_SENTINEL = ":project:"


def parse_packages(value: str | list[str] | None) -> list[str]:
    """Split a package spec into normalized entries."""
    if value is None:
        return []
    if isinstance(value, list):
        parts = value
    else:
        parts = value.split(",")
    return [part.strip() for part in parts if part.strip()]


def format_packages(parts: Sequence[str]) -> str:
    """Join package entries for HTML ``packages`` attributes."""
    return ", ".join(parts)


def is_project_entry(entry: str) -> bool:
    """Return True if *entry* is the project wheel sentinel."""
    return entry.strip() == PROJECT_SENTINEL


def packages_include_project(value: str | list[str] | Sequence[str] | None) -> bool:
    """Return True if *value* contains a ``:project:`` entry."""
    if value is None:
        return False
    if isinstance(value, str) or isinstance(value, list):
        entries = parse_packages(value)
    else:
        entries = [part.strip() for part in value if part.strip()]
    return any(is_project_entry(entry) for entry in entries)


def substitute_project(entries: Sequence[str], wheel_href: str) -> list[str]:
    """Replace ``:project:`` entries with *wheel_href*, deduplicating."""
    substituted = [
        wheel_href if is_project_entry(entry) else entry for entry in entries
    ]
    return list(dict.fromkeys(substituted))


def resolve_packages(app: Sphinx, value: str | list[str] | None) -> str | None:
    """Resolve ``:project:`` entries and return a comma-separated package spec."""
    entries = parse_packages(value)
    if not entries:
        return None
    if not packages_include_project(entries):
        return format_packages(entries)
    if app.builder.format != "html":
        return format_packages(entries)
    from sphinx_pyrepl_web.wheel import project_wheel_href

    wheel = project_wheel_href(app)
    return format_packages(substitute_project(entries, wheel))
