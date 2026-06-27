# sphinx-pyrepl-web

Sphinx extension to embed [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) in documentation.

## Installation

```bash
python -m pip install sphinx-pyrepl-web
```

For development:

```bash
python -m pip install -e ".[test,docs]"
```

## Usage

Add the extension to the target project's `conf.py`:

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
   :file: setup.py
   :packages: numpy
```

### Directive options

The directives should map to [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes: 

| Option | Description |
|--------|-------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`) |
| `:packages:` | Comma-separated PyPI packages to preload |
| `:repl-title:` | Title shown in the REPL header |
| `:file:` | Path to a Python startup script (relative to doc source) |
| `:no-header:` | Hide the header bar |
| `:no-buttons:` | Hide copy/clear buttons |
| `:readonly:` | Disable input |
| `:no-banner:` | Hide the Python version banner |

Optional Sphinx config:

```python
pyrepl_js = "../pyrepl.js"  # default; path to the pyrepl-web loader script
```

## Updating vendored assets

JavaScript assets are vendored from [chrizzFTD/pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) (`grill` branch). To update them, run:

```bash
python scripts/vendor_repl.py
```

This requires [git](https://git-scm.com/) and [Bun](https://bun.sh/).
