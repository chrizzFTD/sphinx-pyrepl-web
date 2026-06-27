Examples
========

Basic REPL
----------

.. code-block:: rst

   .. py-repl::

.. py-repl::

Light theme without header & banner
-----------------------------------

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

The ``:file:`` option loads a Python script into the REPL namespace. If the script
defines a ``setup()`` function, its output is shown when the REPL starts.

.. code-block:: rst

   .. py-repl::
      :file: _static/setup.py

.. py-repl::
   :file: _static/setup.py

The startup script:

.. literalinclude:: _static/setup.py
   :language: python

Interactive session
-------------------

Inline directive content is replayed with ``>>>`` prompts, syntax highlighting,
and live output. Doctest-style ``>>>`` prefixes are stripped automatically.

.. code-block:: rst

   .. py-repl::
      :no-header:
      :no-banner:

      >>> x = 2 + 2
      >>> print(f"{x=}")
      >>> x * 10

.. py-repl::
   :no-header:
   :no-banner:

   >>> x = 2 + 2
   >>> print(f"{x=}")
   >>> x * 10

Combine a silent bootstrap file with a visible replay body:

.. code-block:: rst

   .. py-repl::
      :file: _static/setup.py
      :no-header:

      >>> print(message)

.. py-repl::
   :file: _static/setup.py
   :no-header:

   >>> print(message)

Use ``:replay:`` on ``:file:`` to replay a file with prompts instead of silent load:

.. code-block:: rst

   .. py-repl::
      :file: _static/replay_demo.py
      :replay:
      :no-header:
      :no-banner:

.. py-repl::
   :file: _static/replay_demo.py
   :replay:
   :no-header:
   :no-banner:
