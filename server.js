const fs = require('fs');
const { readFileStream } = require('./readFile');

const Broadcast = (id, chunk, connections) => {
  connections.forEach(({ toClientStream }) => {
    toClientStream.write(chunk);
  });
};

const createConnection = (connections, id, fromClient, toClient) => {
  readFileStream(fromClient, (chunk) => {
    Broadcast(id, chunk, connections);
  });

  const toClientStream = fs.createWriteStream(toClient, 'utf8');
  console.log(`connection established with ${id}`);
  return { id, toClientStream };
};

const main = () => {
  const connections = [];
  readFileStream('./.chat/chatServer.txt', (chunk) => {
    const [id, fromClient, toClient] = chunk.trimEnd().split(',');

    const connection = createConnection(connections, id, fromClient, toClient);
    connections.push(connection);
  });
};

main();
