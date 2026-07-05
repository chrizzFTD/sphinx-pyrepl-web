Development
===========

Git clone, then install:

.. code-block:: bash

    pip install -e ".[test,docs]"

The `[docs]` extra installs the `pyrepl_test_pkg` fixture used in the examples.

Python code within the `.. py-repl::` directive is written to `_static/pyrepl/` at build time and emitted as `replay-src`.

File paths in `:packages:`, `:src:`, `replay-src`, and `pyrepl_autodoc_packages` are rewritten to page-relative URLs at build time so REPLs work on nested pages (for example `docs/api/...`). PyPI package names, absolute URLs, and paths you write as root-absolute (`/_static/...`) are left unchanged.

``pyrepl_js`` (default: ``"../pyrepl.js"``) sets the loader script Sphinx injects on REPL pages; the extension vendors and copies pyrepl-web automatically, so override it only for a custom loader path or CDN.

wheels
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


Basic REPL
----------