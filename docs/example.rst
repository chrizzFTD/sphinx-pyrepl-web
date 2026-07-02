Examples
========

Basic REPL
----------

.. code-block:: rst

   .. py-repl::

.. py-repl::

Light theme, minimal
--------------------

.. code-block:: rst

   .. py-repl::
      :theme: catppuccin-latte
      :no-header:
      :no-banner:

.. py-repl::
   :theme: catppuccin-latte
   :no-header:
   :no-banner:

Startup script
--------------

The ``:src:`` option loads a Python script into the REPL namespace. If the script
defines a ``setup()`` function, its output is shown when the REPL starts.

Startup script:

.. literalinclude:: _static/setup.py
   :language: python

RST content:

.. code-block:: rst

   .. py-repl::
      :src: _static/setup.py

Rendered result:

.. py-repl::
   :src: _static/setup.py

Replay session
--------------

Inline directive content should follow Doctest-style (``>>>`` / ``...``) and is used as replay prompts.

.. code-block:: rst

   .. py-repl::
      :no-header:
      :no-banner:

      >>> x = 2 + 2
      >>> print(f"{x=}")
      >>> x * 10
      >>> class Foo:
      ...     x = 1
      ...
      >>> Foo()

.. py-repl::
   :no-header:
   :no-banner:

   >>> x = 2 + 2
   >>> print(f"{x=}")
   >>> x * 10
   >>> class Foo:
   ...     x = 1
   ...
   >>> Foo()

Combine a silent bootstrap file with a visible replay body:

.. code-block:: rst

   .. py-repl::
      :src: _static/setup.py
      :no-header:

      >>> print(message)

.. py-repl::
   :src: _static/setup.py
   :no-header:

   >>> print(message)

Use ``:replay:`` on ``:src:`` to source a file as replay.

Source script:

.. literalinclude:: _static/replay_demo.py
   :language: python

RST content:

.. code-block:: rst

   .. py-repl::
      :src: _static/replay_demo.py
      :replay:
      :no-header:
      :no-banner:

Rendered result:

.. py-repl::
   :src: _static/replay_demo.py
   :replay:
   :no-header:
   :no-banner:

Autodoc
-------

When ``pyrepl_doctest_blocks = "autodoc"``, doctest examples in documented
APIs become interactive REPLs. Set ``pyrepl_autodoc_packages`` to install the
documented package from a Pyodide-compatible wheel (or PyPI name) and
automatically import the documented object before replay:

.. code-block:: python

   # conf.py
   html_static_path = ["_static"]
   pyrepl_autodoc_packages = "_static/wheels/pyrepl_test_pkg-1.0.0-py3-none-any.whl"

Autodoc still imports the package on the host at build time (for example via
``pip install -e ".[docs]"`` in this repository).

Source module:

.. literalinclude:: ../../tests/fixtures/pyrepl_test_pkg/pyrepl_test_pkg/demo.py
   :language: python

RST content:

.. code-block:: rst

   .. autofunction:: pyrepl_test_pkg.demo.example_generator

Rendered result:

.. autofunction:: pyrepl_test_pkg.demo.example_generator

Local Pyodide wheels
--------------------

The same wheel can be referenced manually from ``.. py-repl::`` when you want
a standalone REPL without autodoc:

.. code-block:: rst

   .. py-repl::
      :packages: _static/wheels/pyrepl_test_pkg-1.0.0-py3-none-any.whl
      :no-header:
      :no-banner:

      >>> import pyrepl_test_pkg
      >>> pyrepl_test_pkg.ping()

.. py-repl::
   :packages: _static/wheels/pyrepl_test_pkg-1.0.0-py3-none-any.whl
   :no-header:
   :no-banner:

   >>> import pyrepl_test_pkg
   >>> pyrepl_test_pkg.ping()
