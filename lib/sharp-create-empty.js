"use strict";

var sharp = require('sharp');

var sharpCreateEmpty = function(width, height, channels) {
  const emptyRgbaPixel = 0x00000000;
  var canvas = Buffer.alloc(width * height * channels, emptyRgbaPixel);
  return sharp(canvas, { raw: { width, height, channels } })
};

module.exports = sharpCreateEmpty;
