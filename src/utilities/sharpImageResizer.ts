import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

class SharpImageResizer {
  async resizeImage(inputPath: string, outputPath: string, width: number, height: number): Promise<void> {
    console.log('Input Path:', inputPath);
    console.log('Output Path:', outputPath);
    console.log('Width:', width);
    console.log('Height:', height);
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

  async resizeAndSendImage(req: Request, res: Response): Promise<void> {
    console.log('Inside resizeAndSendImage function'); 

    try {
      const { filename, width, height } = req.query; 

     // Check for missing parameters
if (!filename || !width || !height) {
  console.error('Missing filename, height, or width.');
  res.status(400).send('Missing filename, height, or width.');
  return;
}



   // Check for valid input
const parsedWidth = parseInt(width as string);
const parsedHeight = parseInt(height as string);
if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    console.error('Invalid Input for height or width.');
    res.status(400).send('Invalid Input for height or width.');
    return;
}


      // Construct the full path of the resized image
      const inputImagePath = path.join(__dirname, '../../assets/images/full', filename as string);
      const outputDir = path.join(__dirname, '../../assets/images/resized');
      const imageFilename = path.basename(filename as string);
      const resizedImagePath = path.join(outputDir, `resized-${imageFilename}`);
      
      // Log the paths for debugging
      console.log('Input Image Path:', inputImagePath);
      console.log('Resized Image Path:', resizedImagePath);

      // Resize the image
      await this.resizeImage(inputImagePath, resizedImagePath, parsedWidth, parsedHeight);

      // Set the content type to 'image/jpeg'
      res.type('image/jpeg');

      // Send the resized image as a response
      res.sendFile(resizedImagePath);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred while processing the image.');
    }
  }
}

export default new SharpImageResizer();
