#!/usr/bin/env python3
"""Build pyrepl_test_pkg wheel and copy it into docs and test fixture paths."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PKG_DIR = ROOT / "tests" / "fixtures" / "pyrepl_test_pkg"
WHEEL_NAME = "pyrepl_test_pkg-1.0.0-py3-none-any.whl"
DEST_DIRS = (
    ROOT / "tests" / "fixtures" / "wheels",
    ROOT / "docs" / "_static" / "wheels",
)


def run(cmd: list[str], *, cwd: Path) -> None:
    print(f"+ {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd, check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--keep-dist",
        action="store_true",
        help="Leave the build dist/ directory in the fixture package tree",
    )
    args = parser.parse_args()

    dist_dir = PKG_DIR / "dist"
    if dist_dir.exists():
        shutil.rmtree(dist_dir)

    run([sys.executable, "-m", "pip", "wheel", ".", "-w", "dist"], cwd=PKG_DIR)

    built = dist_dir / WHEEL_NAME
    if not built.is_file():
        wheels = sorted(dist_dir.glob("*.whl"))
        if len(wheels) != 1:
            sys.exit(f"expected one wheel in {dist_dir}, found: {wheels!r}")
        built = wheels[0]

    for dest_dir in DEST_DIRS:
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / WHEEL_NAME
        shutil.copy2(built, dest)
        print(f"copied {built.name} -> {dest}")

    if not args.keep_dist:
        shutil.rmtree(dist_dir)


if __name__ == "__main__":
    main()
