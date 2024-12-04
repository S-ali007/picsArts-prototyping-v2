const express = require("express");
const { uploadOnCloudinary } = require("./utils/cloudinary");
const { upload } = require("./middlewares/multer.middleware");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
const { fal } = require("@fal-ai/client");
dotenv.config();
fal.config({
  credentials: process.env.FAL_KEY,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/fine-tune", upload.array("image"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path)
    );
    const uploadedImages = await Promise.all(uploadPromises);
    
    const imageUrls = uploadedImages.map((upload) => upload.secure_url);

    const fluxApiUrl = "fal-ai/flux-lora-fast-training";

    const fluxApiKey = process.env.FAL_KEY;

    const requestBody = imageUrls;

    console.log(requestBody, "sdsssss");
    const fluxResponse = await fal.subscribe(fluxApiUrl, {
      input: {
        images_data_url:
          "https://res.cloudinary.com/dqmzbj8kt/image/upload/v1732273571/meb2pr9rnyfynx7trwmd.jpg",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    console.log(fluxResponse.data);

    res.status(200).json({
      message: "Images uploaded and fine-tuning request sent successfully",
      fluxResponse: fluxResponse.data,
    });
  } catch (error) {
    console.error("Error uploading images or calling Flux API:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/prompting", async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ message: "No text " });
    }

    const { data } = req.body;
    // console.log(data, "hhhh");
    const result = await fal.run("fal-ai/flux/dev", {
      input: {
        prompt: data,
        seed: 6252023,
        image_size: "landscape_4_3",
        num_images: 1,
      },
    });
    console.log(result.data.images);
    const uploadPromises = result.data.images.map((file) =>
      uploadOnCloudinary(file.url)
    );
    const imageUrls = await Promise.all(uploadPromises);
    console.log(imageUrls, "imageUrls");

    // const imageUrls = [
    //   {
    //     url: "https://res.cloudinary.com/dqmzbj8kt/image/upload/v1732552282/fvwzWjRveUApgvJlpBtOF_txwxp3.png",
    //   },
    // ];
    res.status(200).json({
      message: "Images uploaded and fine-tuning request sent successfully",
      fluxResponse: imageUrls,
    });
  } catch (error) {
    console.error("Error uploading text or calling Flux API:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
