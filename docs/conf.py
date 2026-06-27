from datetime import date

from sphinx_pyrepl_web import __version__

project = "sphinx-pyrepl-web"
version = __version__
author = "Christian López Barrón"
copyright = f"{date.today().year}, {author}"

extensions = [
    "myst_parser",
    "sphinx_pyrepl_web",
]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_sidebars = {
    "**": [
        "about.html",
        "localtoc.html",
    ],
}
