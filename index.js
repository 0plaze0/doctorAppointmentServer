require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/dbConn");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

connectDB(process.env.DB_URI);

//middlewares
app.use(express.json());
app.use(cors());
//routes

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => {
    console.log(`Running in ${PORT}`);
  });
});
