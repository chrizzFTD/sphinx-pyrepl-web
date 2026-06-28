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

.. code-block:: rst

   .. py-repl::
      :src: _static/setup.py

.. py-repl::
   :src: _static/setup.py

The startup script:

.. literalinclude:: _static/setup.py
   :language: python

Replay session
--------------

Inline directive content is replayed with ``>>>`` prompts, syntax highlighting,
and live output. Doctest-style ``>>>`` / ``...`` prefixes and bare ``...``
block terminators are stripped automatically.

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

Use ``:replay:`` on ``:src:`` to replay a file with prompts instead of silent load:

.. code-block:: rst

   .. py-repl::
      :src: _static/replay_demo.py
      :replay:
      :no-header:
      :no-banner:

.. py-repl::
   :src: _static/replay_demo.py
   :replay:
   :no-header:
   :no-banner:

The replay script:

.. literalinclude:: _static/replay_demo.py
   :language: python

Autodoc
-------

The documented module's source is loaded in advance before replay, so
module members are available in the REPL namespace. Modules under the Sphinx
source tree use silent ``:src:``; installed packages use ``packages=``.

Source module:

.. literalinclude:: _static/autodoc_demo.py
   :language: python

RST content:

.. code-block:: rst

   .. autofunction:: autodoc_demo.example_generator

Rendered result:

.. autofunction:: autodoc_demo.example_generator
