# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-06-27

### Fixed

- Bare `...` doctest block terminators in `.. py-repl::` directive bodies are no
  longer emitted as Python `Ellipsis` in generated replay scripts. They are
  converted to blank lines so multi-line blocks (e.g. class definitions) replay
  correctly in pyrepl-web. ([#7](https://github.com/chrizzFTD/sphinx-pyrepl-web/issues/7))

### Changed

- Extended the Replay session docs example with a multi-line class definition
  demonstrating standard doctest formatting.

## [0.1.0] - 2026-06-27

Initial PyPI release.
