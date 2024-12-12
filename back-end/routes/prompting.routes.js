const express = require("express");
const { promptingController } = require("../controllers/prompting.controller");

const router = express.Router();

router.post("/prompting", promptingController);

module.exports = router;
