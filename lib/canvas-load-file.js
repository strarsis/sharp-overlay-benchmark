var Promise = require('bluebird'),
    Canvas  = require('canvas'), 
    Image   = Canvas.Image, 
    fs      = Promise.promisifyAll(require('fs'));

var canvasLoadFile = function(sPath) {
  return fs.readFileAsync(sPath)
  .then(function(buf) {
    var img = new Image;
    img.src = buf;
    return img;
  });
};

module.exports = canvasLoadFile;
