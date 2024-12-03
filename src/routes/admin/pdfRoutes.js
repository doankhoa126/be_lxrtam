import express from 'express';
import multer from 'multer';
import { convertPdfToPng } from '../../controllers/admin/pdfController.js';

const router = express.Router();

// Cấu hình Multer để lưu file PDF upload
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /upload-pdf:
 *   post:
 *     summary: Upload và chuyển đổi PDF sang PNG
 *     description: Tải file PDF, chuyển đổi thành PNG và lưu với tên chỉ định.
 *     tags:
 *       - PDF
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
 *                 description: Tệp PDF cần chuyển đổi
 *               fileName:
 *                 type: string
 *                 description: Tên file PNG lưu
 *     responses:
 *       200:
 *         description: PDF đã được chuyển đổi thành PNG.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 outputDir:
 *                   type: string
 *       500:
 *         description: Đã xảy ra lỗi trong quá trình xử lý file.
 */
router.post('/upload-pdf', upload.single('file'), convertPdfToPng);

export default router;
