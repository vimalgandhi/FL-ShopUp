const mongoose = require("mongoose");
const { mongoConnectionUrl } = require("../configs/env")

module.exports = function () {
  mongoose
    .connect(mongoConnectionUrl)
    .then(() => console.log("Connected to MongoDB..."));
};
