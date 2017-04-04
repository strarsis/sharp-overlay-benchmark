"use strict";

var Promise             = require('bluebird'),
    fs                  = Promise.promisifyAll(require('fs')),
    globAsync           = Promise.promisify(require('glob')),

    Canvas              = require('canvas'), 
    Image               = Canvas.Image, 
    canvasLoadFile      = require('./lib/canvas-load-file'),
    canvasToBufferAsync = require('./lib/canvas-to-buffer-async'),

    Benchmark           = require('benchmark');

var inputDir = './input',
    tWidth   = 450,
    tHeight  = 300,
    rows     =   9,
    cols     =   9,
    chnls    =   4;

return globAsync(inputDir + '/*.jpg')
.then(function(imgInputPaths) {

  var suite = new Benchmark('canvas', {'defer': true, 'fn': function(deferred) {
    var imgPage    = new Canvas(cols*tWidth, rows*tHeight, chnls),
        imgPageCtx = imgPage.getContext('2d');

    Promise.each(imgInputPaths, function(imgInputPath, index) {
      let col = (index % cols),
          row = Math.floor(index / cols);

      return canvasLoadFile(imgInputPath)
      .then(function(imgInput) {
        imgPageCtx.drawImage(imgInput, col*tWidth, row*tHeight);
      });
    })
    .then(function() {
      return canvasToBufferAsync(imgPage);
    })
    .then(function(buf) {
      return fs.writeFileAsync('./output/output-canvas.png', buf);
    })
    .then(function() {
      console.log('Done.');
      deferred.resolve();
    });

  }})

  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run({ 'async': true });

});
