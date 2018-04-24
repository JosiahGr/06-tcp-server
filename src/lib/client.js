'use strict';

const faker = require('faker');

module.export = class Client {
  constructor(socket) {
    this.nickname = faker.internet.userName();
    this.userId = this.newId();
    this.socket = socket;
  }

  // newId(value) {
  //   const uniqueId = value;
  //   if (!value) {
  //     return Date.now();
  //   }
  // }
};
