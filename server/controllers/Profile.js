const User = require("../models/User");
const Post = require("../models/Post");

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user.id);
    const profile = await User.findOne({ username }).select("-password");
    const posts = await Post.find({ user: profile._id })
      .populate("user", "-password")
      .populate("comments.commentBy", "first_name last_name picture username")
      .sort({ createdAt: -1 });

    const friendship = {
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };

    if (!profile) {
      return res.json({ ok: false });
    }
    if (
      user.friends.includes(profile._id) &&
      profile.friends.includes(user._id)
    ) {
      friendship.friends = true;
    }
    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }
    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }
    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }

    await profile.populate("friends", "first_name last_name username picture");
    res.json({ ...profile.toObject(), posts, friendship });
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        new: true,
      }
    );
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
};
