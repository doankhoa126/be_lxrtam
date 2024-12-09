import express from "express";
import multer from "multer";
import { uploadPngFiles } from "../../controllers/admin/pdfController.js";

const router = express.Router();

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Middleware to handle multiple files
const uploadMultiple = upload.array("files", 10); // Limit to 10 files

/**
 * @swagger
 * /upload/png-files:
 *   post:
 *     summary: Upload PNG files
 *     tags:
 *       - File Upload
 *     description: API to upload PNG files to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: List of PNG files to upload.
 *     responses:
 *       200:
 *         description: Files uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tải lên tệp hoàn tất.
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fileName:
 *                         type: string
 *                         example: example.png
 *                       savedAs:
 *                         type: string
 *                         example: sanitized_example.png
 *                       outputPath:
 *                         type: string
 *                         example: /uploads/data/sanitized_example.png
 *       400:
 *         description: No files uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không có tệp nào được tải lên.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi trong quá trình xử lý tệp.
 */

router.post("/upload/png-files", uploadMultiple, uploadPngFiles);

export default router;
