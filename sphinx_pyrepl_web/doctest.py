"""Utilities for parsing doctest blocks in docstrings."""


def _is_doctest_input_line(line: str) -> bool:
    """Return True if *line* is a doctest input or continuation prompt."""
    stripped = line.lstrip()
    if stripped.startswith(">>> "):
        return True
    if stripped == ">>>":
        return True
    if stripped.startswith("..."):
        return True
    return False


def extract_doctest_inputs(lines: list[str]) -> list[str]:
    """Return input-only doctest lines, dropping expected output and tracebacks.

    Keeps lines starting with ``>>>`` or ``...`` (including bare ``...`` block
    terminators). Drops expected output lines and traceback blocks (from
    ``Traceback`` through the error message).
    """
    result: list[str] = []
    in_traceback = False
    in_block = False

    for line in lines:
        stripped = line.lstrip()

        if stripped.startswith("Traceback"):
            in_traceback = True
            continue

        if in_traceback:
            # Only resume on a new primary prompt; traceback ellipsis uses ``...``.
            if stripped.startswith(">>> "):
                in_traceback = False
            else:
                continue

        if _is_doctest_input_line(line):
            in_block = True
            result.append(line)
        elif in_block and stripped == "":
            result.append(line)
        else:
            # Expected output or trailing non-doctest content.
            pass

    return result
