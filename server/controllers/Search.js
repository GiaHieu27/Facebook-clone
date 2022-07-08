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

exports.addToSearchHistory = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const user = await User.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        { _id: req.user.id, "search._id": check._id },
        {
          $set: {
            "search.$.createAt": new Date(),
          },
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          search: {
            user: searchUser,
            createAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const results = await User.findById(req.user.id)
      .select("search")
      .populate("search.user", "first_name last_name username picture");
    res.json(results.search);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeHistorySearch = async (req, res) => {
  try {
    const { searchUser } = req.body;
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { search: { user: searchUser } } }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
