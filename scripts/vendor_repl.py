#!/usr/bin/env python3
"""Vendor pyrepl-web build artifacts from chrizzFTD/pyrepl-web (grill branch)."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = "https://github.com/chrizzFTD/pyrepl-web.git"
DEFAULT_BRANCH = "grill"


def run(cmd: list[str], *, cwd: Path | None = None) -> None:
    print(f"+ {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd, check=True)


def require_tool(name: str) -> None:
    if shutil.which(name) is None:
        sys.exit(f"error: {name!r} not found on PATH")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--asset-dir",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "sphinx_pyrepl_web" / "pyrepl",
        help="Directory to write vendored assets into",
    )
    parser.add_argument(
        "--branch",
        default=DEFAULT_BRANCH,
        help=f"pyrepl-web branch to vendor (default: {DEFAULT_BRANCH})",
    )
    args = parser.parse_args()
    asset_dir: Path = args.asset_dir
    branch: str = args.branch

    require_tool("git")
    require_tool("bun")

    with tempfile.TemporaryDirectory(prefix="vendor-pyrepl-") as tmp:
        clone_dir = Path(tmp) / "pyrepl-web"
        run(
            [
                "git",
                "clone",
                "--depth",
                "1",
                "--branch",
                branch,
                REPO,
                str(clone_dir),
            ]
        )
        commit = subprocess.check_output(
            ["git", "rev-parse", "HEAD"],
            cwd=clone_dir,
            text=True,
        ).strip()
        run(["bun", "install"], cwd=clone_dir)
        run(["bun", "run", "build"], cwd=clone_dir)

        dist = clone_dir / "dist"
        if not dist.is_dir():
            sys.exit(f"error: build did not produce {dist}")

        if asset_dir.exists():
            shutil.rmtree(asset_dir)
        asset_dir.mkdir(parents=True)
        copied = []
        for src in sorted(dist.iterdir()):
            if src.is_file():
                shutil.copy2(src, asset_dir / src.name)
                copied.append(src.name)

        version_file = asset_dir / "version.txt"
        version_file.write_text(f"{branch}@{commit}\n", encoding="utf-8")
        copied.append("version.txt")

    print(f"\nVendored {len(copied)} file(s) to {asset_dir}:")
    for name in copied:
        print(f"  {name}")
    print(f"Source: {REPO} ({branch}@{commit})")


if __name__ == "__main__":
    main()
