const router = require("express").Router();
const Post = require("../models/PostModel.js");
const auth = require("../middleware/auth.js");
const multer = require("multer");
const { cloudinary } = require("../utils/cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({storage: storage}).single("postImage");

router.post("/", async function (req, res) {
  upload(req, res, async function (err) {
      try {
        const uploadedImg = req.body.postImage;
        const uploadRes = await cloudinary.uploader.upload(uploadedImg, {
          upload_preset: "ml_default",
        });

        const newPost = new Post({
          postName: req.body.postName,
          postDescription: req.body.postDescription,
          postImage: uploadRes.secure_url,
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Upload unsucessful" });
    }
  });
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
