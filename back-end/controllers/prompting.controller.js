const { fal } = require("@fal-ai/client");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const promptingController = async (req, res) => {
  // try {
  //   const { prompt } = req.body;
  //   if (!prompt) {
  //     return res.status(400).json({ message: "Prompt is required" });
  //   }

  //   const result = await fal.run("fal-ai/flux/dev", {
  //     input: {
  //       prompt,
  //       seed: 6252023,
  //       image_size: "landscape_4_3",
  //       num_images: 1,
  //     },
  //   });

  //   const uploadedImages = await Promise.all(
  //     result.data.images.map((img) => uploadOnCloudinary(img.url))
  //   );

  //   res.status(200).json({
  //     message: "Prompting completed",
  //     images: uploadedImages,
  //   });
  // } catch (err) {
  //   console.error("Prompting error:", err);
  //   res.status(500).json({ message: "Server error", error: err.message });
  // }

  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ message: "No text " });
    }

    const { data } = req.body;
    // console.log(data, "hhhh");
    // const result = await fal.run("fal-ai/flux/dev", {
    //   input: {
    //     prompt: data,
    //     seed: 6252023,
    //     image_size: "landscape_4_3",
    //     num_images: 1,
    //   },
    // });
    // console.log(result.data.images);
    // const uploadPromises = result.data.images.map((file) =>
    //   uploadOnCloudinary(file.url)
    // );
    // const imageUrls = await Promise.all(uploadPromises);
    // console.log(imageUrls, "imageUrls");

    // const imageUrls = [
    //   {
    //     url: "https://res.cloudinary.com/dqmzbj8kt/image/upload/v1732552282/fvwzWjRveUApgvJlpBtOF_txwxp3.png",
    //   },
    // ];

    res.status(200).json({
      message: "Images uploaded and fine-tuning request sent successfully",
      // fluxResponse: imageUrls,
      fluxResponse: data,
    });
  } catch (error) {
    console.error("Error uploading text or calling Flux API:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { promptingController };
