'use strict';

const net = require('net');
const logger = require('./logger');
const faker = require('faker');
const Client = require('./client');

const app = net.createServer();
let clientPool = [];

const parseCommand = (message, socket) => {
  if (!message.startsWith('@')) {
    return false;
  }

  const parsedMessage = message.split(' ');
  const command = parsedMessage[0];
  logger.log(logger.INFO, `Parsing a command ${command}`);

  switch (command) {
    case '@list': {
      const clientNames = clientPool.map(client => client.name).join('\n');
      socket.write(`${clientNames}\n`);
      break;
    }

    case '@quit': {
      socket.write('You have been logged out.\n');
      socket.end();
      break;
    }

    // case '@nickname': {
    // };

    case '@dm': {
      const reciever = parsedMessage[1];
      const message = parsedMessage.slice(2).join(' ');

      clientPool.foreach(user) {
        if(user.nickname === reciever) {
          // add tempelate literals
          user.socket.write(`${message}`);
        }
        break;
      }
    };

    default:
      socket.write('INVALID COMMAND');
      break;
  }
  return true;
};

const removeClient = socket => () => {
  clientPool = clientPool.filter(client => client !== socket);
  logger.log(logger.INFO, `Removing ${socket.name}`);
};

app.on('connection', (socket) => {
  logger.log(logger.INFO, 'new socket');
  clientPool.push(socket);
  socket.write('Welcome to the chat!\n');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    logger.log(logger.INFO, `Processing a message: ${message}`);

    if (parseCommand(message, socket)) {
      return;
    }

    clientPool.forEach((client) => {
      if (client !== socket) {
        client.write(`${socket.name}: ${message}\n`);
      }
    });
  });
  socket.on('close', removeClient(socket));
  socket.on('error', () => {
    logger.log(logger.ERROR, socket.name);

    removeClient(socket)();
  });
});

const server = module.exports = {};

server.start = () => {
  if (!process.env.PORT) {
    logger.log(logger.ERROR, 'missing PORT');
    throw new Error('missing PORT');
  }
  logger.log(logger.INFO, `Server is up on PORT ${process.env.PORT}`);
  return app.listen({ port: process.env.PORT }, () => {});
};

server.stop = () => {
  logger.log(logger.INFO, 'Server is offline');
  return app.close(() => {});
};
