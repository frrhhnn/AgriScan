const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDirectory = path.join(__dirname, "../public/icons");

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDirectory)) {
  fs.mkdirSync(iconDirectory, { recursive: true });
}

async function generateIcons() {
  try {
    const inputImage = path.join(__dirname, "../public/logo.png");

    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size)
        .toFile(path.join(iconDirectory, `icon-${size}x${size}.png`));

      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate apple-touch-icon
    await sharp(inputImage)
      .resize(180, 180)
      .toFile(path.join(__dirname, "../public/apple-touch-icon.png"));

    console.log("Generated apple-touch-icon.png");

    // Generate favicon
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(__dirname, "../public/favicon.ico"));

    console.log("Generated favicon.ico");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
