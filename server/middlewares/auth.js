const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    // console.log(req);
    let tmp = req.header("Authorization");
    // console.log(tmp);

    const token = tmp ? tmp.slice(7, tmp.length) : "";
    // console.log(token);
    if (!token) {
      return res.status(400).json({ message: "Khong the uy quyen 1" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Khong the uy quyen 2" });
      }
      // console.log(user);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
