const express = require("express");
const router = express.Router();

const { authUser } = require("../middlewares/auth");
const {
  search,
  addToSearchHistory,
  getSearchHistory,
} = require("../controllers/Search");

router.post("/search/:searchTerm", authUser, search);
router.put("/addToSearchHistory", authUser, addToSearchHistory);
router.get("/getSearchHistory", authUser, getSearchHistory);

module.exports = router;
