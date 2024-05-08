const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require('./routes')
require("dotenv").config();

const cors = require("cors");
const port = 3005;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("../frontend/build")); // для сборки приложения

app.use('/', routes)

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});