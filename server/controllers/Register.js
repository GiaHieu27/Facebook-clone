const bcrypt = require("bcrypt");

const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");

async function register(req, res) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDate,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Email không đúng định dạng" });
    }

    const checkEmailUnique = await User.findOne({ email });
    if (checkEmailUnique) {
      return res
        .status(400)
        .json({ message: "Email đã được sử dung! Vui lòng nhập email khác" });
    }

    if (!validateLength(first_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "first name Chỉ được nhập từ 2 đến 13 kí tự" });
    }

    if (!validateLength(last_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "last name Chỉ được nhập từ 2 đến 13 kí tự" });
    }

    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({ message: "password tối đa 6 ký tự" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUserName = `${first_name}${last_name}`;
    let newUserName = await validateUserName(tempUserName);

    const user = await new User({
      first_name,
      last_name,
      username: newUserName,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDate,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.last_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      token: token,
      verified: user.verified,
      message: "Đăng ký thành công ! Xác thực Email của bạn",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = register;
