# sphinx-pyrepl-web

Sphinx extension to embed [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web) in documentation.

## Install

```bash
pip install sphinx-pyrepl-web
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

All options drive [pyrepl-web](https://github.com/chrizzFTD/pyrepl-web)'s attributes:

| Option | Description                                                    |
|--------|----------------------------------------------------------------|
| `:theme:` | Color theme (`catppuccin-mocha`, `catppuccin-latte`)           |
| `:packages:` | Comma-separated PyPI packages, URLs or relative wheel paths    |
| `:repl-title:` | Title in the REPL header                                       |
| `:src:` | Path to a Python startup script                                |
| `:replay:` | Replay `:src:` with interactive prompts instead of silent load |
| `:no-header:` | Hide the header bar                                            |
| `:no-buttons:` | Hide copy/clear buttons                                        |
| `:readonly:` | Disable input                                                  |
| `:no-banner:` | Hide the Python version banner                                 |

### Sphinx options

Enable [doctest style examples](https://docs.python.org/3/library/doctest.html) conversion into pre-configured interactive REPLs

`pyrepl_doctest_blocks`:

| Value             | Outcome                             |
|-------------------|-------------------------------------|
| `False` (default) | Don't convert doctest blocks        |
| `"autodoc"`       | Convert doctest blocks from autodoc |
| `"all"`           | Convert all doctest blocks          |

`pyrepl_autodoc_packages`:

| Value                   | Outcome                                                            |
|-------------------------|--------------------------------------------------------------------|
| `None` (default)        | Replay doctest input without preloading packages                   |
| Wheel path / PyPI names | Install the package and import the documented object before replay |

### Local wheels

Unreleased branches can be available in the REPL by building the corresponding wheel and placing it under Sphinx's `html_static_path`.

All options combined:

```python
extensions = [
    "sphinx.ext.autodoc",
    "sphinx_pyrepl_web",
]

html_static_path = ["_static"]

pyrepl_doctest_blocks = "autodoc"
pyrepl_autodoc_packages = "_static/wheels/my_package-1.0.0-py3-none-any.whl"
```
