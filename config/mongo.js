'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db_ip = process.env.DB_PORT_27017_TCP_ADDR || 'zacchung.ddns.net'
// Connection URL
const url = `mongodb://${db_ip}:27017`;

// Database Name
const dbName = 'db_cyclone';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
let db;
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

module.exports = {
  getDb: () => {
    return db;
  }
};
