const mongoose = require("mongoose");

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mtqfogt.mongodb.net/?retryWrites=true&w=majority`;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database successfully connected!");
  } catch (err) {
    console.log("DATABASE ERROR", err);
  }
};

module.exports = connectToDB;
