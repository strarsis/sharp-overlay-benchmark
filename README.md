# sharp-overlay-benchmark

Clone and install the package dependencies, satisfy sharp+canvas system dependencies if necessary.
````
$ git clone https://github.com/strarsis/sharp-overlay-benchmark.git
$ cd sharp-overlay-benchmark/
$ npm install
````


Then run both tests to compare the ops/second:
````
(cwd is project workdir)
$ node test-sharp
$ node test-canvas
````

The generated images have been added to this repository now to improve test reproducibility.
They can be (re-)generated using the generate-input.js script:
````
$ cd generate/
$ node generate-input
````
