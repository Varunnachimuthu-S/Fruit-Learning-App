import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fruit names matching your fruits.js file
const fruits = [
  'mango', 'pineapple', 'papaya', 'banana', 'coconut', 'dragonfruit', 'passionfruit', 'guava',
  'strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry', 'grape',
  'orange', 'lemon', 'lime', 'grapefruit', 'tangerine', 'kumquat',
  'peach', 'plum', 'cherry', 'apricot', 'nectarine',
  'apple', 'pear', 'watermelon', 'kiwi', 'pomegranate'
];

const imagesDir = path.join(__dirname, 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Download images using Pexels API (free)
async function downloadFruitImages() {
  console.log('Starting fruit image downloads...\n');
  console.log('Using Lorem Picsum for placeholder images with different colors...\n');
  
  // Use different image IDs from Lorem Picsum to get variety
  const imageIds = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
    210, 220, 230, 240, 250, 260, 270, 280, 290, 300
  ];
  
  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];
    const filename = `${fruit}.jpg`;
    const filepath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} already exists, skipping...`);
      continue;
    }
    
    try {
      // Using Lorem Picsum - high quality placeholder images
      const url = `https://picsum.photos/id/${imageIds[i]}/800/800`;
      console.log(`Downloading ${filename}...`);
      await downloadImage(url, filepath);
      console.log(`✓ Downloaded ${filename}`);
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
    }
  }
  
  console.log('\n✓ Image download complete!');
  console.log('Images saved to:', imagesDir);
  console.log('\nNote: These are placeholder images. You can replace them with actual fruit photos later.');
}

downloadFruitImages().catch(console.error);
