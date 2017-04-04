"use strict";

var Promise             = require('bluebird'),
    fs                  = Promise.promisifyAll(require('fs')),
    globAsync           = Promise.promisify(require('glob')),

    sharp               = require('sharp'),
    sharpCreateEmpty    = require('./lib/sharp-create-empty'),
    sharpReloadImage    = require('./lib/sharp-reload-image'),

    Benchmark           = require('benchmark');


var inputDir = './input',
    tWidth   = 450,
    tHeight  = 300,
    rows     =   9,
    cols     =   9,
    chnls    =   3;


return globAsync(inputDir + '/*.jpg')
.then(function(imgInputPaths) {

  var suite = new Benchmark('sharp', {'defer': true, 'fn': function(deferred) {
    var imgPage = sharpCreateEmpty(cols*tWidth, rows*tHeight, chnls);

    Promise.each(imgInputPaths, function(imgInputPath, index) {
      let col = (index % cols),
          row = Math.floor(index / cols);
      console.log('overlaying with row ' + (row+1) + ', col ' + (col+1) + '...');

      imgPage.overlayWith(imgInputPath, {left: col*tWidth, top: row*tHeight});
      return sharpReloadImage(imgPage)
      .then(function(imgPageNew) {
        imgPage = imgPageNew;
      });
    })
    .then(function() {
      return imgPage.toFile('./output/output-sharp.png');
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
