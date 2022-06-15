const fs = require('fs');

const readFileStream = (filename, cb, startPoint = 0) => {

  const readStream = fs.createReadStream(filename,
    {
      encoding: 'utf8',
      start: startPoint,
    });

  readStream.on('data', (chunk) => {
    startPoint += chunk.length;
    cb(chunk);
  })

  readStream.on('end', () => {
    setTimeout(() => readFileStream(filename, cb, startPoint), 100);
  })
};

module.exports = { readFileStream };
