const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId; 
const dbUrl = "mongodb://localhost:27017";
const dbName = "fullstackcode";

module.exports = {
    mongodb: mongodb,
    MongoClient: MongoClient,
    ObjectId: ObjectId,
    connUrl: dbUrl,
    dbName: dbName 
}