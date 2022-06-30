const User = require("../models/User");

exports.addFriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);

      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id, requests: sender._id },
        });

        await sender.updateOne({
          $push: { following: receiver._id },
        });
        res.json({ message: "Yêu cầu kết bạn thành công" });
      } else {
        return res
          .status(400)
          .json({ message: "Đã gửi yêu cầu kết bạn trước đó" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Bạn không thể kết bạn với chính mình" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);

      if (
        receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id, requests: sender._id },
        });

        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        res.json({ message: "Huỷ yêu cầu kết bạn thành công" });
      } else {
        return res.status(400).json({ message: "Đã huỷ yêu cầu trước đó" });
      }
    } else {
      return res.status(400).json({ message: "Không thể huỷ kết bạn" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);

      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $pull: {
            followers: sender._id,
            requests: sender._id,
          },
        });

        await sender.updateOne({
          $pull: {
            following: receiver._id,
          },
        });
        res.json({ message: "Xoá kết bạn thành công" });
      } else {
        return res.status(400).json({ message: "Đã xoá" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Bạn không thể xoá kết bạn với chính mình" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);

      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });

        await sender.updateOne({
          $push: { following: receiver._id },
        });
        res.json({ message: "Theo dõi thành công" });
      } else {
        return res
          .status(400)
          .json({ message: "Đã theo dõi người này trước đó" });
      }
    } else {
      return res.status(400).json({ message: "Không thể theo dõi người này" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);

      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });

        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        res.json({ message: "Đã bỏ theo dõi" });
      } else {
        return res.status(400).json({ message: "Bạn chưa theo dõi người này" });
      }
    } else {
      return res.status(400).json({ message: "Không thể bỏ theo dõi" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);

      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $push: { friends: sender._id, following: sender._id },
        });

        await receiver.updateOne({
          $pull: { requests: sender._id },
        });

        await sender.updateOne({
          $push: { friends: receiver._id, followers: receiver._id },
        });
        res.json({ message: "Hai bạn đã thành bạn bè" });
      } else {
        return res
          .status(400)
          .json({ message: "Bạn chưa gửi lời mời kết bạn" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Không thể chấp nhận lời mời kết bạn" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.unfriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);

      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });

        await sender.updateOne({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        res.json({ message: "Huỷ kết bạn thành công" });
      } else {
        return res.status(400).json({ message: "Hai người chưa là bạn" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Bạn không thể huỷ kết bạn với chính mình" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
