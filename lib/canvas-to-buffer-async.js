var Promise = require('bluebird'),
    canvas  = require('canvas');

var canvasToBufferAsync = function(canvas) {
  return new Promise(function(resolve, reject) { // automatic promisification fails here
    return canvas.toBuffer(function(err, buf) {
      if(err) reject(err);
      resolve(buf);
    });
  });
};

module.exports = canvasToBufferAsync;
