const mongoose = require("mongoose");

function connectDb(urlDb) {
  try {
    mongoose.connect(urlDb);
    console.log("database connect success");
  } catch (error) {
    console.log("database connect error: " + error);
  }
}

module.exports = connectDb;
