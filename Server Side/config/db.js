const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  await client.connect();
  db = client.db("RUMC_SMART_HEALTH_PORTAL");
  console.log("MongoDB connected");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
