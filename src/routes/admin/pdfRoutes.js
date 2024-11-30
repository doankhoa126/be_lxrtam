import express from 'express';
import { pdfMiddleware, uploadPDF, loadPDF } from '../../controllers/admin/pdfController.js';

const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a PDF
 *     tags: [PDFs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF uploaded successfully
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
 *         description: No file uploaded or invalid file type
 */
router.post('/upload', pdfMiddleware.single('file'), uploadPDF);

/**
 * @swagger
 * /api/pdf/{fileName}:
 *   get:
 *     summary: Load a PDF by name
 *     tags: [PDFs]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the PDF file
 *     responses:
 *       200:
 *         description: The PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: PDF not found
 */
router.get('/pdf/:fileName', loadPDF);

export default router;
