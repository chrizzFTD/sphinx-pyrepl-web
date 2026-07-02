from datetime import date

from sphinx_pyrepl_web import __version__

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
pyrepl_autodoc_packages = "_static/wheels/pyrepl_test_pkg-1.0.0-py3-none-any.whl"
html_static_path = ["_static"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_sidebars = {
    "**": [
        "about.html",
        "localtoc.html",
    ],
}
