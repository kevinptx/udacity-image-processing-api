import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import SharpImageResizer from '../utilities/sharpImageResizer';

describe('sharpImageResizer', () => {
    const testImagePath = path.join(__dirname, '../../assets/images/full/fjord.jpg');
    const outputDir = path.join(__dirname, '../../assets/images/resized');
    const resizedImagePath = path.join(outputDir, 'fjord-200x200.jpg');

    beforeAll(() => {
        // Create the output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
    });

    afterEach(() => {
        // Clean up the resized image file if it was created during the test
        if (fs.existsSync(resizedImagePath)) {
            fs.unlinkSync(resizedImagePath);
        }
    });

    afterAll(() => {      
        if (fs.existsSync(outputDir)) {
            fs.rmdirSync(outputDir, { recursive: true });
        }
    });

    it('should resize an image', async () => {
        const width = 100;
        const height = 100;

        await SharpImageResizer.resizeImage(testImagePath, resizedImagePath, width, height);

        const metadata = await sharp(resizedImagePath).metadata();
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    });
});