const express = require('express');
const { upload } = require("../middlewares/multer.middleware");
const { fineTuneController } = require("../controllers/fineTune.controller");

const router = express.Router();

router.post("/fine-tune", upload.array("image"), fineTuneController);

module.exports = router;

