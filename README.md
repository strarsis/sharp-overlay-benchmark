# sharp-overlay-benchmark

Clone and install the package dependencies, satisfy sharp+canvas system dependencies if necessary.

First generate the test input images:
````
$ cd generate/
$ node generate-input
````

Then run both tests to compare the ops/second:
````
(cwd is project workdir)
$ node test-sharp
$ node test-canvas
````
