// goldInventoryRoutes.js
import express from 'express';
import {
    createGoldInventory,
    getGoldInventory,
    updateGoldInventory,
    getUnfinishedOrders
} from '../../controllers/admin/goldInventoryController.js';

const router = express.Router();

router.post('/gold-inventory', createGoldInventory);
router.get('/gold-inventory/:id', getGoldInventory);
router.put('/gold-inventory/:id', updateGoldInventory);
router.get("/unfinished-orders", getUnfinishedOrders);


// Swagger Documentation
/**
 * @swagger
 * components:
 *   schemas:
 *     GoldInventory:
 *       type: object
 *       properties:
 *         NgayLenDon:
 *           type: string
 *           format: date
 *         NguoiYeuCau:
 *           type: string
 *         NgayHoanThanh:
 *           type: string
 *           format: date
 *         SoGio:
 *           type: string
 *         MaVanDon:
 *           type: string
 *         LuongHang:
 *           type: string
 *         TrangThaiDon:
 *           type: string
 *         NguoiPhuTrach:
 *           type: string
 *         MaSanPham:
 *           type: string
 *         MaVang:
 *           type: string
 *         MaLap:
 *           type: string
 *         TrongLuongThanhPham:
 *           type: number
 *           format: double
 *         GiacMocPhuKien:
 *           type: number
 *           format: double
 *         TrongLuongPhoi:
 *           type: number
 *           format: double
 *         NgayTiepNhanDon:
 *           type: string
 *           format: date
 *         HanGiaoInfo:
 *           type: string
 *         To3D:
 *           type: string
 *         NguoiPhuTrach3D:
 *           type: string
 *         NgayCanLap:
 *           type: string
 *         TrongLuongVang24k:
 *           type: number
 *           format: double
 *         TrongLuongHoi:
 *           type: number
 *           format: double
 *         TrongLuongVangCu:
 *           type: number
 *           format: double
 *         TrongLuongTheoCongThucCan:
 *           type: number
 *           format: double
 *         DoLechCanChoPhep:
 *           type: number
 *           format: double
 *         TongTrongLuongSauKhiCongLechCanChoPhep:
 *           type: number
 *           format: double
 *         NguoiPhuTrachCan:
 *           type: string
 *         NgayDuc:
 *           type: string
 *           format: date
 *         TrongLuongSauKhiDuc:
 *           type: number
 *           format: double
 *         ChenhLechSauKhiDuc:
 *           type: number
 *           format: double
 *         NguoiPhuTrachDuc:
 *           type: string
 *         NgayXuatCatTiThanhPhoiSanPham:
 *           type: string
 *           format: date
 *         NguoiPhuTrachCatTy:
 *           type: string
 *         ThuTuCatPhoiTrongNgay:
 *           type: integer
 *         TongTrongLuongPhoiCat:
 *           type: number
 *           format: double
 *         TrongLuongTyThuVao:
 *           type: number
 *           format: double
 *         TrongLuongVangGiamDiSauKhiCatTi:
 *           type: number
 *           format: double
 */

/**
 * @swagger
 * /gold-inventory:
 *   post:
 *     summary: Create a new gold inventory record
 *     tags: [GoldInventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoldInventory'
 *     responses:
 *       201:
 *         description: Record created successfully
 *       500:
 *         description: Failed to create record
 */

/**
 * @swagger
 * /gold-inventory/{id}:
 *   get:
 *     summary: Get a gold inventory record by ID
 *     tags: [GoldInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record found
 *       404:
 *         description: Record not found
 *       500:
 *         description: Failed to fetch record
 */

/**
 * @swagger
 * /gold-inventory/{id}:
 *   put:
 *     summary: Update a gold inventory record by ID
 *     tags: [GoldInventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoldInventory'
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Record not found or no changes made
 *       500:
 *         description: Failed to update record
 */

/**
 * @swagger
 * /unfinished-orders:
 *   get:
 *     summary: Get unfinished gold inventory orders
 *     tags: [GoldInventory]
 *     responses:
 *       200:
 *         description: List of unfinished gold inventory orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       NgayLenDon:
 *                         type: string
 *                         format: date
 *                       NguoiYeuCau:
 *                         type: string
 *                       NgayHoanThanh:
 *                         type: string
 *                         format: date
 *                       TrangThaiDon:
 *                         type: string
 *       404:
 *         description: No unfinished orders found
 *       500:
 *         description: Failed to fetch orders
 */


export default router;