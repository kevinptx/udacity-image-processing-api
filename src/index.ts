import express from 'express';
import path from 'path';
import LoggerMiddleware from './utilities/logger'; // Import the logger middleware
import sharpImageResizer from './utilities/sharpImageResizer';

const app = express();
const PORT = 3000;

// Use the logger middleware for all requests
app.use(LoggerMiddleware.logRequest);
app.use(LoggerMiddleware.logResponse);

// Define paths for your images
const imagePath = path.join(__dirname, '..', 'assets', 'images', 'full');
const outputPath = path.join(__dirname, '..', 'assets', 'images', 'resized');

app.get('/resize', async (req, res) => {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
        return res.status(400).send('Missing required parameters');
    }

    const inputImagePath = path.join(imagePath, `${filename}.jpg`);
    const outputImagePath = path.join(outputPath, `${filename}-${width}x${height}.jpg`);

    try {
        await sharpImageResizer.resizeImage(inputImagePath, outputImagePath, +width, +height);
        res.status(200).send(`Image ${filename} resized to ${width}x${height} and saved successfully`);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
