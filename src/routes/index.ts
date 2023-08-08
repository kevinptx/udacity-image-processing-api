import express from 'express';
import images from './api/images'; // Import the images router module

const router = express.Router();

// Use the images router for the '/images' endpoint
router.use('/images', images);

export default router;
