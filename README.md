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
   :src: setup.py
   :packages: numpy

.. py-repl::
   :no-header:

   >>> import math
   >>> math.sqrt(16)
```

### Directive options

Most directives drive [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes, with a few exceptions unique to this extension: 

| Option | Description | pyrepl-web attr? |
|--------|-------------|------------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`) | ✅                |
| `:packages:` | Comma-separated PyPI packages to preload | ✅                |
| `:repl-title:` | Title shown in the REPL header | ✅                |
| `:src:` | Path to a Python startup script (relative to doc source); copied into the build output | ✅                |
| `:replay:` | Replay `:src:` with interactive prompts instead of silent load | ✅                |
| `:silent:` | Keep `:src:` silent even when combined with a directive body | ❌                |
| `:strip-prompts:` | Strip ``>>>`` / ``...`` prefixes from directive body (default when body present) | ❌                |
| `:no-header:` | Hide the header bar | ✅                |
| `:no-buttons:` | Hide copy/clear buttons | ✅                |
| `:readonly:` | Disable input | ✅                |
| `:no-banner:` | Hide the Python version banner | ✅                |

Directive body content (inline Python in the `.. py-repl::` block) is also extension-only: it is written to `_static/pyrepl/` at build time and emitted as `replay-src`.

Optional Sphinx config:

```python
pyrepl_js = "../pyrepl.js"  # default; path to the pyrepl-web loader script
```

## Updating to new pyrepl-web

Since [chrizzFTD/pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) is a fork, this sphinx extension vendors the JavaScript assets for easier distribution. To update them, run:

```bash
python scripts/vendor_repl.py
```

The `grill` branch is used by default. Use the --branch argument to specify a different one:

```bash
python scripts/vendor_repl.py --branch cursor/repl-startup-replay-2e3f
```

This requires [git](https://git-scm.com/) and [Bun](https://bun.sh/).
