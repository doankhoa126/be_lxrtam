import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../controllers/admin/employeeController.js';


const router = express.Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Lấy tất cả nhân viên
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Danh sách nhân viên
 *       500:
 *         description: Lỗi server
 */
router.get('/', getAllEmployees);

/**
 * @swagger
 * /employees/{employee_id}:
 *   get:
 *     summary: Lấy thông tin nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhân viên
 *     responses:
 *       200:
 *         description: Thông tin nhân viên
 *       404:
 *         description: Không tìm thấy nhân viên
 *       500:
 *         description: Lỗi server
 */
router.get('/:employee_id', getEmployeeById);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Tạo mới nhân viên
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 description: Mã nhân viên
 *               full_name:
 *                 type: string
 *                 description: Họ và tên
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               level:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               hire_date:
 *                 type: string
 *                 format: date
 *               contract_type:
 *                 type: string
 *               current_address:
 *                 type: string
 *               education_level:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               tax_id:
 *                 type: string
 *               health_insurance_number:
 *                 type: string
 *               social_insurance_number:
 *                 type: string
 *               emergency_contact_name:
 *                 type: string
 *               emergency_contact_phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhân viên được tạo thành công
 *       500:
 *         description: Lỗi server
 */
router.post('/', createEmployee);

/**
 * @swagger
 * /employees/{employee_id}:
 *   put:
 *     summary: Cập nhật thông tin nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhân viên
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               level:
 *                 type: string
 *               gender:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               hire_date:
 *                 type: string
 *                 format: date
 *               contract_type:
 *                 type: string
 *               current_address:
 *                 type: string
 *               education_level:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               tax_id:
 *                 type: string
 *               health_insurance_number:
 *                 type: string
 *               social_insurance_number:
 *                 type: string
 *               emergency_contact_name:
 *                 type: string
 *               emergency_contact_phone:
 *                 type: string
 *               modified_by:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thông tin nhân viên thành công
 *       404:
 *         description: Không tìm thấy nhân viên
 *       500:
 *         description: Lỗi server
 */
router.put('/:employee_id', updateEmployee);

/**
 * @swagger
 * /employees/{employee_id}:
 *   delete:
 *     summary: Xóa nhân viên theo ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhân viên
 *     responses:
 *       200:
 *         description: Xóa nhân viên thành công
 *       404:
 *         description: Không tìm thấy nhân viên
 *       500:
 *         description: Lỗi server
 */
router.delete('/:employee_id', deleteEmployee);

export default router;
