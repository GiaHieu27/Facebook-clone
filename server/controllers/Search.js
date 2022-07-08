const User = require("../models/User");

exports.search = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await User.find({
      $text: {
        $search: searchTerm,
      },
    }).select("first_name last_name username picture");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
