export {};
const { MongoClient } = require('mongodb');
const Loans = require('./loans');
require('dotenv').config();
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name
const dbName = process.env.DB_NAME;

class MongoDB {
  client;
  db: any;
  loans: any;
  constructor() {
    this.client = new MongoClient(url);
  }
  async connect() {
    await this.client.connect();
    console.log('Successfully connected');
    this.db = this.client.db(dbName);
    this.loans = new Loans(this.db);
  }
  async disconnect () {
    await this.client.close();
  }
}

module.exports = new MongoDB();