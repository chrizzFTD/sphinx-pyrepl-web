Examples
========

Basic REPL
----------

.. code-block:: rst

   .. py-repl::

.. py-repl::

Light theme without header
--------------------------

.. code-block:: rst

   .. py-repl::
      :theme: catppuccin-latte
      :no-header:

.. py-repl::
   :theme: catppuccin-latte
   :no-header:

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
