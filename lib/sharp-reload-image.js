var Promise = require('bluebird'),
    sharp   = require('sharp');

Promise.promisifyAll(sharp.prototype, {multiArgs: true});

var sharpReloadImage = function(imgSharp) {
  return imgSharp.raw().toBufferAsync()
  .then(function(dataAndInfo) {
    var data = dataAndInfo[0],
        info = dataAndInfo[1];
    return sharp(data, {raw: info})
  });
};

module.exports = sharpReloadImage;
