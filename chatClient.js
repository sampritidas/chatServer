const fs = require('fs');
const { stdout } = require('process');
const { readFileStream } = require('./readFile');

const main = () => {
  const [fromClient, toClient] = process.argv.slice(2);

  const ws = fs.createWriteStream(fromClient, 'utf8');
  readFileStream(toClient, (chunk) => stdout.write(chunk));

  process.stdin.pipe(ws);
};

main();
