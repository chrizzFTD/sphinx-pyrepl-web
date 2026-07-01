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
| `:packages:` | Comma-separated PyPI packages or local wheel paths under `_static/wheels/` |
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
pyrepl_autodoc_packages = None  # optional; wheel path or PyPI name for autodoc REPLs
```

### Docstring conversion

Converting doctest examples from docstrings into interactive REPLs is opt-in with `sphinx.ext.autodoc`:

```python
# conf.py
extensions = [
    "sphinx.ext.autodoc",
    "sphinx_pyrepl_web",
]
pyrepl_doctest_blocks = "autodoc"
pyrepl_autodoc_packages = "_static/wheels/my_package-1.0.0-py3-none-any.whl"
```

|                   | `pyrepl_doctest_blocks` options     |
|-------------------|-------------------------------------|
| `False` (default) | Disable autodoc conversion          |
| `"autodoc"`       | Convert doctests found by autodoc   |
| `"all"`           | Transform every doctest block found |


|                         | `pyrepl_autodoc_packages` options                                |
|-------------------------|------------------------------------------------------------------|
| unset / `None` / `""`   | Replay doctest input only                                        |
| wheel path or PyPI name | Preload the documented package before replay (comma-separated)   |

Autodoc integration assumes a single documented package. The wheel (or PyPI
name) preloads it in the browser REPL; autodoc still imports the package on
the host at build time.

To build this project's docs locally:

```bash
pip install -e ".[docs]"
```

The `[docs]` extra installs doc build dependencies plus the `pyrepl_test_pkg`
fixture used in the examples.

### Local Pyodide wheels

Preload a wheel built for Pyodide (for example a wasm extension or an unreleased
branch build) by placing it under the Sphinx static path and referencing it from
``:packages:``. Ensure ``html_static_path`` includes ``"_static"``:

```python
# conf.py
html_static_path = ["_static"]
```

```rst
.. py-repl::
   :packages: _static/wheels/myext-pyodide.whl
   :src: _static/bootstrap.py
   :no-banner:

   >>> import myext
   >>> myext.ping()
```

Wheels under ``_static/`` are copied into the HTML output when ``_static`` is listed
in ``html_static_path`` (Sphinx does not copy project static files automatically
unless configured). At runtime, [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)
resolves site-relative wheel paths to absolute URLs before calling
``micropip.install()``.

**CI tip:** copy each build artifact to a stable docs filename so RST does not
need updating per release, for example
``cp dist/myext-1.2.3-*.whl docs/_static/wheels/myext-pyodide.whl``.

Ensure the web server serves ``.whl`` files with MIME type ``application/zip``
(Read the Docs does this by default).

## Updating pyrepl-web

Since [chrizzFTD/pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) is a fork, this sphinx extension vendors the JavaScript assets for easier distribution. To update them, run:

```bash
python scripts/vendor_repl.py
```

The `grill` branch is used by default. Use the `branch` argument to specify a different one:

```bash
python scripts/vendor_repl.py --branch custom/feature-branch
```

This requires [git](https://git-scm.com/) and [Bun](https://bun.sh/).
