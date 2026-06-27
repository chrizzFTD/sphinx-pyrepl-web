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

Most options drive [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes, with a few exceptions unique to this extension: 

| Option | Description | `pyrepl-web` attr? |
|--------|-------------|------------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`) | ✅                |
| `:packages:` | Comma-separated PyPI packages to preload | ✅                |
| `:repl-title:` | Title in the REPL header | ✅                |
| `:src:` | Path to a Python startup script | ✅                |
| `:replay:` | Replay `:src:` with interactive prompts instead of silent load | ✅                |
| `:silent:` | Keep `:src:` silent even when combined with a directive body | ❌                |
| `:strip-prompts:` | Strip ``>>>`` / ``...`` prefixes from directive body | ❌                |
| `:no-header:` | Hide the header bar | ✅                |
| `:no-buttons:` | Hide copy/clear buttons | ✅                |
| `:readonly:` | Disable input | ✅                |
| `:no-banner:` | Hide the Python version banner | ✅                |

Directive body content (inline Python in the `.. py-repl::` block) is also extension-only: it is written to `_static/pyrepl/` at build time and emitted as `replay-src`.

Optional Sphinx config:

```python
pyrepl_js = "../pyrepl.js"  # default; path to the pyrepl-web loader script
```

## Autodoc integration

When `sphinx.ext.autodoc` is enabled, you can automatically convert docstring
``Example:`` / ``Examples:`` doctest blocks into interactive REPLs at build time.
Python source docstrings stay unchanged (full doctests with expected output are
preserved for IDE hover docs and optional ``doctest`` runs).

Add to `conf.py`:

```python
extensions = [
    "sphinx.ext.autodoc",
    "sphinx_pyrepl_web",
]

pyrepl_autodoc = True
pyrepl_autodoc_packages = "my_package"  # required for Pyodide import
pyrepl_autodoc_sections = ["Example"]
pyrepl_autodoc_options = {"no-banner": True}
```

| Config | Default | Description |
|--------|---------|-------------|
| `pyrepl_autodoc` | `False` | Enable autodoc docstring → REPL conversion |
| `pyrepl_autodoc_packages` | `None` | Value for `:packages:` on generated directives (auto-derived from object name when unset) |
| `pyrepl_autodoc_sections` | `["Example", "Examples"]` | Section titles to convert |
| `pyrepl_autodoc_options` | `{}` | Default directive flags, e.g. `{"no-banner": True}` |

**Limitations (v0.2.0):**

- Targets raw Google-style / plain-text section headers (without `sphinx.ext.napoleon`). Napoleon-converted sections are not detected yet.
- `:packages:` (or auto-derivation) is required so Pyodide can import your library.
- Live REPL output may differ from doctest expected output (e.g. `PosixPath` vs `WindowsPath`, traceback formatting).

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
