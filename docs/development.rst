Development
===========

Setup
-----

Clone the repository, then install in editable mode with test and docs dependencies:

.. code-block:: bash

   pip install -e ".[test,docs]"

The ``[docs]`` extra pulls in doc build dependencies and the ``pyrepl_test_pkg``
fixture used in the examples.

Build-time behavior
-------------------

Python code within a ``.. py-repl::`` directive is written to ``_static/pyrepl/``
at build time and emitted as ``replay-src``.

File paths in ``:packages:``, ``:src:``, ``replay-src``, and
``pyrepl_autodoc_packages`` are rewritten to page-relative URLs so REPLs work on
nested pages (for example ``docs/api/...``). PyPI package names, absolute URLs,
and paths written as root-absolute (``/_static/...``) are left unchanged.

``pyrepl_js`` (default: ``"../pyrepl.js"``) sets the loader script Sphinx injects
on REPL pages. The extension vendors and copies `pyrepl-web <https://github.com/chrizzFTD/pyrepl-web>`_ automatically;
override this only when pointing at a custom loader path or CDN.

Static wheels
-------------

Wheels under ``_static/`` are copied into the HTML output when ``_static`` is
listed in ``html_static_path``. At runtime, `pyrepl-web <https://github.com/chrizzFTD/pyrepl-web>`_
resolves site-relative wheel paths to absolute URLs before calling
``micropip.install()``.

Paths must use the wheel's actual PyPI-compliant filename (for example
``myext-1.2.3-py3-none-any.whl``). ``micropip`` rejects other names.

.. tip::

   Copy each build artifact into ``docs/_static/wheels/`` under its original
   filename, then update ``:packages:`` or ``pyrepl_autodoc_packages`` when the
   version changes::

      cp dist/myext-1.2.3-*.whl docs/_static/wheels/

Ensure the web server serves ``.whl`` files with MIME type ``application/zip``
(Read the Docs does this by default).

Updating pyrepl-web
-------------------

This extension vendors JavaScript from
`pyrepl-web <https://github.com/chrizzFTD/pyrepl-web>`_'s fork for easier
distribution. To refresh the vendored assets:

.. code-block:: bash

   python scripts/vendor_repl.py

The ``grill`` branch is used by default. Pass ``--branch`` to vendor from another
branch:

.. code-block:: bash

   python scripts/vendor_repl.py --branch custom/feature-branch

This requires `git <https://git-scm.com/>`_ and `Bun <https://bun.sh/>`_.
