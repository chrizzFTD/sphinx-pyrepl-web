# sphinx-pyrepl-web

Sphinx extension to embed [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) in documentation.

## Install

```bash
pip install sphinx-pyrepl-web
```

For development:

```bash
pip install -e ".[test,docs]"
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
   :src: setup.py
   :packages: numpy

.. py-repl::
   :no-header:

   >>> import math
   >>> math.sqrt(16)
```

### Directive options

All options drive [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes, with the exception of `silent`: 

| Option | Description |
|--------|-------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`) |
| `:packages:` | Comma-separated PyPI packages to preload |
| `:repl-title:` | Title in the REPL header |
| `:src:` | Path to a Python startup script |
| `:replay:` | Replay `:src:` with interactive prompts instead of silent load |
| `:silent:` | Keep `:src:` silent even when combined with a directive body |
| `:no-header:` | Hide the header bar |
| `:no-buttons:` | Hide copy/clear buttons |
| `:readonly:` | Disable input |
| `:no-banner:` | Hide the Python version banner |

Python code within the `.. py-repl::` directive is written to `_static/pyrepl/` at build time and emitted as `replay-src`.

Optional Sphinx config:

```python
pyrepl_js = "../pyrepl.js"  # default; path to the pyrepl-web loader script
pyrepl_doctest_blocks = False  # default; see Docstring conversion below
pyrepl_autodoc_bootstrap = True  # default; silent :src: bootstrap for autodoc REPLs
```

### Docstring conversion

Doctest examples in docstrings can be converted into a REPL at build time when you opt in with `sphinx.ext.autodoc`:

```python
# conf.py
extensions = [
    "sphinx.ext.autodoc",
    "sphinx_pyrepl_web",
]
pyrepl_doctest_blocks = "autodoc"
```

|                   | `pyrepl_doctest_blocks` options     |
|-------------------|-------------------------------------|
| `False` (default) | Disable autodoc conversion          |
| `"autodoc"`       | Convert doctests found by autodoc   |
| `"all"`           | Transform every doctest block found |


|                  | `pyrepl_autodoc_bootstrap` options                                           |
|------------------|------------------------------------------------------------------------------|
| `True` (default) | Bootstrap REPL: in-tree modules via silent `:src:`, packages via `packages=` |
| `False`          | Replay doctest input only; documented names are not pre-defined              |

## Updating pyrepl-web

Since [chrizzFTD/pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) is a fork, this sphinx extension vendors the JavaScript assets for easier distribution. To update them, run:

```bash
python scripts/vendor_repl.py
```

The `grill` branch is used by default. Use the `branch` argument to specify a different one:

```bash
python scripts/vendor_repl.py --branch cursor/repl-startup-replay-2e3f
```

This requires [git](https://git-scm.com/) and [Bun](https://bun.sh/).
