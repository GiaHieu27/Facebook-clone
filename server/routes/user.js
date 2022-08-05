const express = require("express");
const router = express.Router();

const { authUser } = require("../middlewares/auth");

const {
  findUser,
  senResetPasswordCode,
  validateResetPassword,
  changePassword,
} = require("../controllers/ResetPassword");
const register = require("../controllers/Register");
const login = require("../controllers/Login");
const {
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
} = require("../controllers/Profile");
const { activeAccount, sendVerification } = require("../controllers/Activate");

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activeAccount);
router.post("/findUser", findUser);
router.post("/sendVerification", authUser, sendVerification);
router.post("/sendResetPasswordCode", senResetPasswordCode);
router.post("/validateResetPassword", validateResetPassword);
router.post("/changePassword", changePassword);

router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCover", authUser, updateCover);
router.put("/updateDetails", authUser, updateDetails);

router.get("/getProfile/:username", authUser, getProfile);

module.exports = router;
