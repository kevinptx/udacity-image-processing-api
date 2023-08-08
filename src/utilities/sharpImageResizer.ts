import sharp from 'sharp';
import fs from 'fs'; // Import the fs module
import path from 'path';

class SharpImageResizer {
  async resizeImage(inputPath: string, outputPath: string, width: number, height: number): Promise<void> {
    // Create the directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Resize and save the image
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
  }
}

export default new SharpImageResizer();
