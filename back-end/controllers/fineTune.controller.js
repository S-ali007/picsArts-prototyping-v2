const { uploadOnCloudinary } = require("../utils/cloudinary");
const { fal } = require("@fal-ai/client");

const fineTuneController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path)
    );
    const uploadedImages = await Promise.all(uploadPromises);

    const imageUrls = uploadedImages.map((upload) => upload.secure_url);

    // Configure the Flux API URL and input
    const fluxApiUrl = "fal-ai/flux-lora-fast-training";

    const fluxResponse = await fal.subscribe(fluxApiUrl, {
      input: {
        images_data_url: imageUrls, // Pass the uploaded image URLs
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    // Respond with success message and API response
    res.status(200).json({
      message: "Images uploaded and fine-tuning request sent successfully",
      fluxResponse: fluxResponse.data,
    });
  } catch (error) {
    console.error("Error during fine-tuning process:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { fineTuneController };
