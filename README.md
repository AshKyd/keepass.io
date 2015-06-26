keepass.io-b
============

Browserifiable fork of [keepass.io](https://github.com/NeoXiD/keepass.io).

This is fairly messy right now as it's for a side-project, and it's a breaking API change from keepass.io so I'm not sure how best to get this one back upstream.

Check the tests for usage guidelines.

Testing
=======

Browserifiable tests are in test_browser/. You can run the tests with

````
cd test_browser
browserify tests.js > tests.browserified.js
# Open test.html in your browser.
````

Caveats
=======

This library doesn't make any attempts to secure memory, thus
your database will be decrypted into potentially dangerous
territory. To be honest I don't know enough about this yet so
YMMV.
