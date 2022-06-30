const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.activeAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { tokenUrl } = req.body;
    const user = jwt.verify(tokenUrl, process.env.TOKEN_SECRET);

    console.log(req.user);
    console.log(user);

    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({ message: "Ban khong co quyen xac thuc" });
    }

    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "Email đã được xác thực trước dó" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      res.status(200).json({ message: "Tài khoản đã được xác thực" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).lean();
    if (user.verified === true) {
      return res.status(404).json({ message: "Tai Khoan da duoc xacs minh" });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.last_name, url);
    return res.status(200).json({ message: "Email xac thuc da duoc gui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
