const mongoose = require('mongoose');
const { connectRedis } = require('./redis');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

async function connectDB(app, port) {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");

    await connectRedis();

    app.listen(port, () => {
      console.log("listening on port", port);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;
