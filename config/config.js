const path = require("node:path");
require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const R_USERNAME = process.env.R_USERNAME;
const R_PASSWORD = process.env.R_PASSWORD;
const PORT = process.env.PORT || 3001;

module.exports = {
  R_USERNAME,
  R_PASSWORD,
  PORT,
};
