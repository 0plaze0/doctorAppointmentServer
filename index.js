require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/dbConn");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

//connection db
connectDB(process.env.DB_URI);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", require("./routes/user.js"));
app.use("/api/auth", require("./routes/auth.js"));

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => {
    console.log(`Running in ${PORT}`);
  });
});
