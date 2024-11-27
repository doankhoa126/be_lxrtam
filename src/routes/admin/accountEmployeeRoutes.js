import express from 'express';
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../controllers/admin/accountEmployeeController.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: AccountEmployee
 *   description: API quản lý tài khoản nhân viên
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     tags: [AccountEmployee]
 *     summary: Lấy tất cả tài khoản nhân viên
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
router.get('/', getAllAccounts);

/**
 * @swagger
 * /accounts/{account_id}:
 *   get:
 *     tags: [AccountEmployee]
 *     summary: Lấy tài khoản nhân viên theo ID
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tài khoản nhân viên
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:account_id', getAccountById);

/**
 * @swagger
 * /accounts:
 *   post:
 *     tags: [AccountEmployee]
 *     summary: Tạo tài khoản nhân viên mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_role:
 *                 type: string
 *               employee_id:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *               created_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 */
router.post('/', createAccount);

/**
 * @swagger
 * /accounts/{account_id}:
 *   put:
 *     tags: [AccountEmployee]
 *     summary: Cập nhật tài khoản nhân viên theo ID
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tài khoản nhân viên cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_role:
 *                 type: string
 *               employee_id:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *               updated_by:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật tài khoản thành công
 *       404:
 *         description: Không tìm thấy tài khoản
 */
router.put('/:account_id', updateAccount);

/**
 * @swagger
 * /accounts/{account_id}:
 *   delete:
 *     tags: [AccountEmployee]
 *     summary: Xóa tài khoản nhân viên theo ID
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của tài khoản nhân viên cần xóa
 *     responses:
 *       200:
 *         description: Xóa tài khoản thành công
 *       404:
 *         description: Không tìm thấy tài khoản
 */
router.delete('/:account_id', deleteAccount);

export default router;
