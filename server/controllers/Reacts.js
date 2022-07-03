const mongoose = require("mongoose");
const React = require("../models/React");

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });

    if (check == null) {
      const newReact = await React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react === react) {
        await React.findByIdAndRemove(check._id);
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getReacts = async (req, res) => {
  try {
    const { id } = req.params;
    const reactArr = await React.find({ postRef: id });
    // const check = await React.findOne({
    //   postRef: id,
    //   reactBy: req.user.id,
    // });

    const newReact = reactArr.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    // console.log(newReact);

    const reacts = [
      { react: "like", count: newReact.like ? newReact.like.length : 0 },
      { react: "love", count: newReact.love ? newReact.love.length : 0 },
      { react: "haha", count: newReact.haha ? newReact.haha.length : 0 },
      { react: "wow", count: newReact.wow ? newReact.wow.length : 0 },
      { react: "sad", count: newReact.sad ? newReact.sad.length : 0 },
      { react: "angry", count: newReact.angry ? newReact.angry.length : 0 },
    ];

    const check = reactArr.find(
      (x) => x.reactBy.toString() === req.user.id
    )?.react;
    res.json({ reacts, check, total: reactArr.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
