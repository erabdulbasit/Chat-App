const express = require("express");
const axios = require("axios");
const router = express.Router();
const { setAvatar } = require("../controllers/usersControllers");

router.get("/setAvatar", async (req, res) => {
  try {
    const avatars = [];

    for (let i = 0; i < 4; i++) {
      try {
        const randomSeed = Math.random().toString(36).substring(7);
        const apiUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;

        const response = await axios.get(apiUrl, {
          responseType: "text",
          timeout: 10000,
        });

        const base64 = Buffer.from(response.data).toString("base64");
        avatars.push(base64);
      } catch (avatarError) {
        console.error(
          `❌ Error fetching avatar ${i + 1}:`,
          avatarError.message
        );

        // Create fallback avatar
        console.log(`🔄 Creating fallback avatar ${i + 1}`);
        const fallbackSvg = createFallbackAvatar(i);
        const fallbackBase64 = Buffer.from(fallbackSvg).toString("base64");
        avatars.push(fallbackBase64);
      }
    }
    res.json({ success: true, avatars });
  } catch (error) {
    console.error("💥 Fatal error in avatar route:", error);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Failed to fetch avatars",
      error: error.message,
    });
  }
});

router.post("/setAvatar/:id", setAvatar);

module.exports = router;
