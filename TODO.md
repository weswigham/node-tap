- fix the markdown reporter
- make it faster (seems like mostly this is just node spawn() overhead)
- read a config file at ~/.taprc for setting default colors,
  reporters, etc
- make colors (and diff colors) configurable
- tests for reporter output
- tests for cli flags and options
- split lib/stack.js out into a separate module
- write a coverage lib that works for child processes