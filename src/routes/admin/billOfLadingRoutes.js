import express from "express";
import {
  checkBillOfLadingValue,
  getBillOfLadingById,
  getBillOfLadingsByDate,
  getBillOfLadingsByDateRange,
  updateBillOfLading,
} from "../../controllers/admin/billOfLadingController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BillOfLading
 *   description: API quản lý vận đơn
 */

/**
 * @swagger
 * /bills:
 *   get:
 *     tags: [BillOfLading]
 *     summary: Lấy tất cả vận đơn trong khoảng thời gian
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày bắt đầu (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày kết thúc (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getBillOfLadingsByDateRange);

/**
 * @swagger
 * /bills/filter-by-date:
 *   get:
 *     tags: [BillOfLading]
 *     summary: Lọc vận đơn theo ngày cụ thể
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày cụ thể để lọc (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Thiếu ngày để lọc
 */
router.get("/filter-by-date", getBillOfLadingsByDate);

/**
 * @swagger
 * /bills/{bill_id}:
 *   get:
 *     tags: [BillOfLading]
 *     summary: Lấy vận đơn theo ID
 *     parameters:
 *       - in: path
 *         name: bill_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của vận đơn
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Không tìm thấy vận đơn
 */
router.get("/:id", getBillOfLadingById);

/**
 * @swagger
 * /bills/{bill_id}:
 *   put:
 *     tags: [BillOfLading]
 *     summary: Cập nhật trọng lượng vận đơn theo ID
 *     parameters:
 *       - in: path
 *         name: bill_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của vận đơn cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trongLuong:
 *                 type: number
 *                 description: Trọng lượng mới
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy vận đơn
 */
router.put("/:id", updateBillOfLading);

/**
 * @swagger
 * /bills/check:
 *   post:
 *     tags: [BillOfLading]
 *     summary: Kiểm tra mã vận đơn và trọng lượng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maSanPham:
 *                 type: string
 *               trongLuong:
 *                 type: number
 *     responses:
 *       200:
 *         description: Giá trị hợp lệ hoặc không khớp
 *       404:
 *         description: Không tìm thấy mã vận đơn
 */
router.post("/check", checkBillOfLadingValue);

export default router;
