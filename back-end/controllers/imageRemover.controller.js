const { rembg } = require("@remove-background-ai/rembg.js");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs").promises;

const dotenv = require("dotenv");
dotenv.config();

const removeBackground = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }
    const inputPath = req.file.path;
    const outputPath = `uploads/${Date.now()}-removed-bg.png`;
    const result = await rembg({
      apiKey: process.env.REMOVE_KEY,
      inputImage: inputPath,
      outputImagePath: outputPath,
      onDownloadProgress: (progress) => console.log("Download:", progress),
      onUploadProgress: (progress) => console.log("Upload:", progress),
    });
    const uploadResult = await uploadOnCloudinary(result.outputImagePath);
    console.log(uploadResult, "result");
    res.status(200).json({
      message: "Background removed successfully!",
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Background Removal Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { removeBackground };
