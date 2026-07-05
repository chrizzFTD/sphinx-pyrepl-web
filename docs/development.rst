Development
===========

.. code-block:: bash

    pip install -e ".[test,docs]"

Python code within the `.. py-repl::` directive is written to `_static/pyrepl/` at build time and emitted as `replay-src`.

File paths in `:packages:`, `:src:`, `replay-src`, and `pyrepl_autodoc_packages` are rewritten to page-relative URLs at build time so REPLs work on nested pages (for example `docs/api/...`). PyPI package names, absolute URLs, and paths you write as root-absolute (`/_static/...`) are left unchanged.

Basic REPL
----------