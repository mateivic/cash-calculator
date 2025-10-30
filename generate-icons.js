/**
 * Icon Generation Script
 *
 * This script generates PWA icons from the icon.svg file.
 *
 * To generate icons:
 * 1. Install required package: npm install -D sharp
 * 2. Run: node generate-icons.js
 *
 * Alternatively, you can:
 * - Use an online tool like https://realfavicongenerator.net/
 * - Use https://favicon.io/favicon-converter/ to convert icon.svg to PNG
 * - Manually create PNG files of sizes 192x192 and 512x512
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp is not installed. Installing now...');
  console.log('Run: npm install -D sharp');
  console.log('\nAlternatively, you can generate icons manually:');
  console.log('1. Open public/icon.svg in a browser');
  console.log('2. Take a screenshot or use an online converter');
  console.log('3. Create icon-192x192.png and icon-512x512.png in the public folder');
  process.exit(1);
}

const sizes = [192, 512];
const inputFile = path.join(__dirname, 'public', 'icon.svg');
const outputDir = path.join(__dirname, 'public');

async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);

    try {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(outputFile);

      console.log(`✅ Generated: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Error generating icon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('\n✨ Icon generation complete!');
}

// Check if icon.svg exists
if (!fs.existsSync(inputFile)) {
  console.error('❌ icon.svg not found in public folder');
  process.exit(1);
}

generateIcons();
