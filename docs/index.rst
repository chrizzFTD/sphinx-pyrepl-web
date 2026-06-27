sphinx-pyrepl-web
=================

Sphinx extension to embed `pyrepl-web <https://github.com/chrizzFTD/pyrepl-web>`_ Python REPLs in documentation.

.. toctree::
   :hidden:

   example

Installation
------------

Install with pip:

.. code-block:: bash

   pip install sphinx-pyrepl-web

For local development:

.. code-block:: bash

   pip install -e ".[docs]"

Usage
-----

Add the extension to your ``conf.py``:

.. code-block:: python

   extensions = [
       "sphinx_pyrepl_web",
   ]

Embed a REPL:

.. code-block:: rst

   .. py-repl::

See :doc:`example` for live demos.

Directive options
-----------------

.. list-table::
   :header-rows: 1

   * - Option
     - Description
   * - ``:theme:``
     - Color theme (``catppuccin-mocha``, ``catppuccin-latte``, or custom)
   * - ``:packages:``
     - Comma-separated PyPI packages to preload
   * - ``:repl-title:``
     - Title shown in the REPL header
   * - ``:file:``
     - Path to a Python startup script (relative to doc source)
   * - ``:no-header:``
     - Hide the header bar
   * - ``:no-buttons:``
     - Hide copy/clear buttons
   * - ``:readonly:``
     - Disable input
   * - ``:no-banner:``
     - Hide the Python version banner

Configuration
-------------

``pyrepl_js`` (default: ``"../pyrepl.js"``)
   Path to the pyrepl-web loader script, relative to Sphinx's ``_static/`` directory.

Updating vendored assets
------------------------

JavaScript assets are vendored from the ``grill`` branch of `chrizzFTD/pyrepl-web <https://github.com/chrizzFTD/pyrepl-web>`_. Maintainers can refresh them with:

.. code-block:: bash

   python scripts/vendor_repl.py

This requires git and `Bun <https://bun.sh/>`_.
