'use strict';

const faker = require('faker');
const uuid = require('uuid');

module.exports = class Client {
  constructor(socket) {
    this.nickname = faker.internet.userName();
    this.userId = uuid();
    this.socket = socket;
  }
};
