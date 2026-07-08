# sphinx-pyrepl-web

[![Python CI](https://github.com/chrizzFTD/sphinx-pyrepl-web/actions/workflows/python-package.yml/badge.svg)](https://github.com/chrizzFTD/sphinx-pyrepl-web/actions/workflows/python-package.yml)
[![Documentation Status](https://readthedocs.org/projects/sphinx-pyrepl-web/badge/?version=latest)](https://sphinx-pyrepl-web.readthedocs.io/en/latest/?badge=latest)
[![PyPI version](https://badge.fury.io/py/sphinx-pyrepl-web.svg)](https://badge.fury.io/py/sphinx-pyrepl-web)
[![PyPI](https://img.shields.io/pypi/pyversions/sphinx-pyrepl-web.svg)](https://pypi.python.org/pypi/sphinx-pyrepl-web)

Sphinx extension to embed [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) in documentation.

## Install

```bash
pip install sphinx-pyrepl-web
```

## Usage

Add the extension to the target project's `conf.py` module:

```python
extensions = [
    "sphinx_pyrepl_web",
]
```

Embed a REPL with the `py-repl` directive:

```rst
.. py-repl::

.. py-repl::
   :theme: catppuccin-latte
   :no-header:

.. py-repl::
   :src: setup.py
   :packages: numpy

.. py-repl::
   :no-header:

   >>> import math
   >>> math.sqrt(16)
```

### Directive options

All options drive [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes:

| Option | Description                                                    |
|--------|----------------------------------------------------------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`)           |
| `:packages:` | Comma-separated PyPI packages, URLs, relative wheel paths, or `:project:` |
| `:repl-title:` | Title in the REPL header                                       |
| `:src:` | Path to a Python startup script                                |
| `:replay:` | Replay `:src:` with interactive prompts instead of silent load |
| `:no-header:` | Hide the header bar                                            |
| `:no-buttons:` | Hide copy/clear buttons                                        |
| `:readonly:` | Disable input                                                  |
| `:no-banner:` | Hide the Python version banner                                 |

### Sphinx options

Enable [doctest style examples](https://docs.python.org/3/library/doctest.html) conversion into pre-configured interactive REPLs with:

`pyrepl_doctest_blocks`:

| Value             | Outcome                               |
|-------------------|---------------------------------------|
| `False` (default) | Don't convert doctest blocks          |
| `"autodoc"`       | Convert doctest blocks from `autodoc` |
| `"all"`           | Convert all doctest blocks            |

`pyrepl_autodoc_packages`:

| Value                   | Outcome                                                            |
|-------------------------|--------------------------------------------------------------------|
| `None` (default)        | Replay doctest input without preloading packages                   |
| `:project:`           | Build a wheel from the documented project and preload it           |
| Wheel / PyPI names      | Extra packages to install, e.g. `":project:,numpy"`                |

Optional when using `:project:`:

| Value | Default | Outcome |
|-------|---------|---------|
| `pyrepl_project_root` | auto-detect | Project root containing `pyproject.toml` (relative to `conf.py`) |
| `pyrepl_wheel_dir` | `_static/wheels` | Directory for the built wheel, relative to `conf.py` |

### Local wheels

Unreleased package wheels can be available in the REPL by building them under Sphinx's `html_static_path`, or by using `:project:` to build automatically at doc-build time.

All options combined:

```python
extensions = [
    "sphinx.ext.autodoc",
    "sphinx_pyrepl_web",
]

html_static_path = ["_static"]

pyrepl_doctest_blocks = "autodoc"
pyrepl_autodoc_packages = ":project:"
```

For a monorepo or non-default layout, point at the package root explicitly:

```python
pyrepl_autodoc_packages = ":project:"
pyrepl_project_root = ".."
```

When the REPL needs the project wheel plus additional packages, combine them in one list:

```python
pyrepl_autodoc_packages = ":project:, numpy"
```

The same `:project:` sentinel works in directive options:

```rst
.. py-repl::
   :packages: :project:, numpy
```
