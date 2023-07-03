const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const Image = require("../models");

router.get("/", (req, res) => {
  res.send("Api Testing");
});

router.post("/upload", upload.single("image"), (req, res) => {
  const imageData = req.file.buffer;
  const contentType = req.file.mimetype;

  const image = new Image({
    data: imageData,
    contentType: contentType,
  });

  image
    .save()
    .then(() => {
      res.send("Image uploaded and saved to MongoDB");
    })
    .catch((error) => {
      console.error("Error saving image to MongoDB:", error);
      res.status(500).send("An error occurred");
    });
});

router.get("/images", (req, res) => {
  Image.find({}, "-_id")
    .then((images) => {
      const formattedImages = images.map((image) => ({
        contentType: image.contentType,
        data: image.data.toString("base64"),
      }));
      res.send(formattedImages);
    })
    .catch((error) => {
      console.error("Error retrieving images from MongoDB:", error);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
