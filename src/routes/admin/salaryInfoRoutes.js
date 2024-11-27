import express from 'express';
import {
  getAllSalaryInfo,
  getSalaryInfoById,
  createSalaryInfo,
  updateSalaryInfo,
  deleteSalaryInfo,
} from '../../controllers/admin/salaryInfoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SalaryInfo
 *   description: API quản lý thông tin lương
 */

/**
 * @swagger
 * /salary-info:
 *   get:
 *     tags: [SalaryInfo]
 *     summary: Lấy danh sách tất cả thông tin lương
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', getAllSalaryInfo);

/**
 * @swagger
 * /salary-info/{salary_info_id}:
 *   get:
 *     tags: [SalaryInfo]
 *     summary: Lấy thông tin lương theo ID
 *     parameters:
 *       - in: path
 *         name: salary_info_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy thông tin lương
 */
router.get('/:salary_info_id', getSalaryInfoById);

/**
 * @swagger
 * /salary-info:
 *   post:
 *     tags: [SalaryInfo]
 *     summary: Thêm mới thông tin lương
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
router.post('/', createSalaryInfo);

/**
 * @swagger
 * /salary-info/{employee_id}: 
 *   put:
 *     tags: [SalaryInfo]
 *     summary: Cập nhật thông tin lương
 *     parameters:
 *       - in: path
 *         name: employee_id
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
router.put('/:employee_id', updateSalaryInfo);

/**
 * @swagger
 * /salary-info/{salary_info_id}:
 *   delete:
 *     tags: [SalaryInfo]
 *     summary: Xóa thông tin lương
 *     parameters:
 *       - in: path
 *         name: salary_info_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/:salary_info_id', deleteSalaryInfo);

export default router;
