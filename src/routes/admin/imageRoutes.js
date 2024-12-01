import express from 'express';
import { imageMiddleware, uploadImage, loadImage } from '../../controllers/admin/imageController.js';
const router = express.Router();
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 path:
 *                   type: string
 *       400:
 *         description: No file uploaded
 */
router.post('/upload', imageMiddleware.single('image'), uploadImage);
/**
 * @swagger
 * /api/images/{imageName}:
 *   get:
 *     summary: Load an image by name
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: imageName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file
 *     responses:
 *       200:
 *         description: The image file
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found
 */
router.get('/images/:imageName', loadImage);
export default router;