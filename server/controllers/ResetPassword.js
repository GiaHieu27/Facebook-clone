const bcrypt = require("bcrypt");

const User = require("../models/User");
const Code = require("../models/Code");
const { sendResetCode } = require("../helpers/mailer");
const generateCode = require("../helpers/generateCode");

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.senResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });

    const code = generateCode(5);
    await new Code({
      code,
      user: user._id,
    }).save();

    sendResetCode(user.email, user.last_name, code);
    return res.status(200).json({ message: "Code send successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetPassword = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email }).lean();
    const dbCode = await Code.findOne({ user: user._id }).lean();

    if (dbCode.code !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate({ email }, { password: cryptedPassword });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
