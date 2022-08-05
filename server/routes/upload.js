const express = require("express");
const router = express.Router();

const { authUser } = require("../middlewares/auth");
const { imageUpload } = require("../middlewares/imageUpload");

const { uploadImages, listImages } = require("../controllers/Upload");


router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages);

module.exports = router;
