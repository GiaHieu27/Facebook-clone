const mongoose = require("mongoose");

function connect(url) {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("database connect success");
  } catch (error) {
    console.log("database connect error: " + error);
  }
}

module.exports = connect;
