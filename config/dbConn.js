const mongoose = require("mongoose");

const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);
  } catch (err) {
    console.log(err);
    console.log("Couldn't connect to database");
  }
};

module.exports = connectDB;
