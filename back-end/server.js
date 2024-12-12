const fineTuneRoutes = require("./routes/fineTune.routes");
const promptingRoutes = require("./routes/prompting.routes");
const imageRemover = require("./routes/imageRemover.routes");

const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", fineTuneRoutes);
app.use("/api/v1", promptingRoutes);
app.use("/api/v1", imageRemover);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
