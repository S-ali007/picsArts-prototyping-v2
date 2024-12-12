const express = require("express");
const { upload } = require("../middlewares/multer.middleware");
const { removeBackground } = require("../controllers/imageRemover.controller");

const router = express.Router();

router.post("/removeBackground", upload.single("image"), removeBackground);

module.exports = router;
