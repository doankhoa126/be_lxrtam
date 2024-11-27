import express from 'express';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../../controllers/admin/roleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API quản lý vai trò
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Lấy danh sách tất cả vai trò
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', getAllRoles);

/**
 * @swagger
 * /roles/{role_id}:
 *   get:
 *     tags: [Roles]
 *     summary: Lấy thông tin vai trò theo ID
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.get('/:role_id', getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     tags: [Roles]
 *     summary: Thêm mới vai trò
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', createRole);

/**
 * @swagger
 * /roles/{role_id}:
 *   put:
 *     tags: [Roles]
 *     summary: Cập nhật vai trò
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:role_id', updateRole);

/**
 * @swagger
 * /roles/{role_id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Xóa vai trò
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/:role_id', deleteRole);

export default router;
