const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("user", "last_name first_name username gender picture cover")
      .sort({ createdAt: -1 });
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const { comment, postId, image } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment,
            images: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");

    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
