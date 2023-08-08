import * as fs from 'fs';
import * as path from 'path';
import sharp = require('sharp');
import SharpImageResizer from '../utilities/sharpImageResizer';

describe('sharpImageResizer', () => {
    const testImagePath = path.join(__dirname, '../../assets/images/full/fjord.jpg');
    const outputDir = path.join(__dirname, '../../assets/images/resized');
    const resizedImagePath = path.join(outputDir, 'fjord-200x200.jpg');


    beforeAll(() => {
        // Create the test image if it doesn't exist
        if (!fs.existsSync(testImagePath)) {
            fs.writeFileSync(testImagePath, Buffer.from([0xFF, 0xD8, 0xFF]));
        }
    });

    afterAll(() => {
        // Clean up the test image and output directory
        if (fs.existsSync(testImagePath)) {
            fs.unlinkSync(testImagePath);
        }
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

    // more test cases as needed
});
