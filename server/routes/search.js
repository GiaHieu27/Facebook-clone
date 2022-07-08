const express = require("express");
const router = express.Router();

const { authUser } = require("../middlewares/auth");
const { search } = require("../controllers/Search");

router.post("/search/:searchTerm", authUser, search);

module.exports = router;
