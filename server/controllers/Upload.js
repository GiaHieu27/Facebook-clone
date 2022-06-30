const cloudinary = require("cloudinary");
const fs = require("fs");

const removeTemp = require("../helpers/removeTemp");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    const images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    res.send(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  try {
    const { path, sort, max } = req.body;
    cloudinary.v2.search
      .expression(path)
      .sort_by("created_at", sort)
      .max_results(max)
      .execute()
      .then((results) => res.json(results))
      .catch((err) => console.error(err.error.message));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          res.status(400).json({ message: "Upload file failed" });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};
