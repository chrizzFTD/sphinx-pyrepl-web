from datetime import date
import sys
from pathlib import Path

from sphinx_pyrepl_web import __version__

sys.path.insert(0, str(Path(__file__).parent / "_static"))

project = "sphinx-pyrepl-web"
version = __version__
author = "Christian López Barrón"
copyright = f"{date.today().year}, {author}"

extensions = [
    "myst_parser",
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_pyrepl_web",
]
pyrepl_doctest_blocks = "autodoc"
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_sidebars = {
    "**": [
        "about.html",
        "localtoc.html",
    ],
}
