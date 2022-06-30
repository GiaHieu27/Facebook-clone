const fs = require("fs");

function removeTemp(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
}

module.exports = removeTemp;
