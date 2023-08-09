import express, { Request, Response } from 'express';
import path from 'path';
import LoggerMiddleware from './utilities/logger';
import sharpImageResizer from './utilities/sharpImageResizer';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(LoggerMiddleware.logRequest);
app.use(LoggerMiddleware.logResponse);

app.use(
  '/assets/images/resized',
  express.static(path.join(__dirname, '..', 'assets', 'images', 'resized'))
);

// Serve the index.html page
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Resize image route
app.get('/resize', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    return res.status(400).send('Missing filename, height, or width.');
  }

  const parsedWidth = parseInt(width as string);
  const parsedHeight = parseInt(height as string);

  if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    return res.status(400).send('Invalid Input for height or width.');
  }

  try {
    await sharpImageResizer.resizeAndSendImage(req, res);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

// Handle other routes with a 404 Not Found error
app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
