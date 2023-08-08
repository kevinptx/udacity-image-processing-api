import express from 'express';
import path from 'path';
import sharpImageResizer from '../../utilities/sharpImageResizer';
import logger from '../../utilities/logger'; // Import the logger middleware

const images = express.Router();

images.use(logger.logRequest); // Use the logger middleware for request logging

images.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const { filename, width, height } = req.query;

        if (!filename || !width || !height) {
            return res.status(400).send('Missing required parameters');
        }

        const inputImagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'full', `${filename}.jpg`);
        const outputImagePath = path.join(__dirname, '..', '..', 'assets', 'images', 'resized', `${filename}-${width}x${height}.jpg`);

        await sharpImageResizer.resizeImage(inputImagePath, outputImagePath, +width, +height);
        res.status(200).send(`Image ${filename} resized to ${width}x${height} and saved successfully`);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
});

export default images;
