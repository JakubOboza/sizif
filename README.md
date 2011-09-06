# Sizif

This is my first project in node.js. It aim to host files from grid_fs for rails applications.
Now it is messy just wrapped around to do some initial testing. I need to clean this up :).

# Changle log

0.0.0 - initial commit

# Todo
- move it to lib module
- add versioning in module
- add configuration other then shell env settings, maybe json
- better handling of errors

# Build

  `make` or `make run` starts server
  `make deps` will install mongo driver

# Testing
I was testing it with my 100kb CV pdf in gridfs and i got on my weak machine >250 req with 10 concurrent clients. Not so bad. `Requests per second:    279.37 [#/sec] (mean)` while rails metal had `Requests per second:    86.06 [#/sec] (mean)`. Node is almost 200 ahead and more threads bigger the gain is.

