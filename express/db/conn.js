const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true },  { useNewUrlParser: true });

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("admin");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};