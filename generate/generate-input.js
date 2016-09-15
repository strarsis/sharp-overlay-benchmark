"use strict";

var Promise   = require('bluebird'),
    path      = require('path'),
    sharp     = require('sharp'),
    TextToSVG = require('text-to-svg'),
    textToSVG = TextToSVG.loadSync();


var inputDir  = './../input',
    rows      = 9,
    cols      = 9;

var textAttrs = {background: 'black', stroke: 'black', fill: 'white'},
    textOpts  = {x: 0, y: 0, fontSize: 300, anchor: 'top', attributes: textAttrs};
var imgBackground = sharp('./background.svg');

imgBackground.setMaxListeners(imgBackground.getMaxListeners() + (rows * cols));
  // prevent warning
var writeFiles = [];
for(  let row  = 1; row <= rows; row++) {
  for(let col  = 1; col <= cols; col++) {
    let svg = textToSVG.getSVG(row + '|' + col, textOpts);
    let img = imgBackground.clone();
    img.overlayWith(Buffer(svg));
    writeFiles.push(img.quality(100).toFile(path.join(inputDir, row + '_' + col + '.jpg')));
  }
}

Promise.all(writeFiles)
.then(function() {
  console.log('Done.');
});
