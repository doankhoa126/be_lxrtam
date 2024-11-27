import express from 'express';
import {
  getAllOvertimeRules,
  getOvertimeRuleById,
  createOvertimeRule,
  updateOvertimeRule,
  deleteOvertimeRule,
} from '../../controllers/admin/overtimeRuleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OvertimeRules
 *   description: API quản lý quy tắc tăng ca
 */

/**
 * @swagger
 * /overtime-rules:
 *   get:
 *     tags: [OvertimeRules]
 *     summary: Lấy danh sách tất cả quy tắc tăng ca
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', getAllOvertimeRules);

/**
 * @swagger
 * /overtime-rules/{id}:
 *   get:
 *     tags: [OvertimeRules]
 *     summary: Lấy thông tin quy tắc tăng ca theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của quy tắc tăng ca
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy quy tắc tăng ca
 */
router.get('/:id', getOvertimeRuleById);

/**
 * @swagger
 * /overtime-rules:
 *   post:
 *     tags: [OvertimeRules]
 *     summary: Tạo mới một quy tắc tăng ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               created_by:
 *                 type: string
 *               standard_work_days_hours:
 *                 type: string
 *               overtime_hours:
 *                 type: string
 *               overtime_meal_hours:
 *                 type: string
 *               standard_work_days:
 *                 type: number
 *     responses:
 *       201:
 *         description: Quy tắc tăng ca được tạo thành công
 */
router.post('/', createOvertimeRule);

/**
 * @swagger
 * /overtime-rules/{id}:
 *   put:
 *     tags: [OvertimeRules]
 *     summary: Cập nhật thông tin quy tắc tăng ca theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của quy tắc tăng ca cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updated_by:
 *                 type: string
 *               standard_work_days_hours:
 *                 type: string
 *               overtime_hours:
 *                 type: string
 *               overtime_meal_hours:
 *                 type: string
 *               standard_work_days:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quy tắc tăng ca được cập nhật thành công
 *       404:
 *         description: Không tìm thấy quy tắc tăng ca để cập nhật
 */
router.put('/:id', updateOvertimeRule);


/**
 * @swagger
 * /overtime-rules/{id}:
 *   delete:
 *     tags: [OvertimeRules]
 *     summary: Xóa quy tắc tăng ca theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của quy tắc tăng ca cần xóa
 *     responses:
 *       200:
 *         description: Quy tắc tăng ca đã được xóa thành công
 *       404:
 *         description: Không tìm thấy quy tắc tăng ca để xóa
 */
router.delete('/:id', deleteOvertimeRule);

export default router;
