import express from 'express';
import {
  getAllAttendances,
  getAttendancesByEmployeeId,
  updateAttendance,
  createAttendance
 
} from '../../controllers/admin/attendanceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendances
 *   description: API quản lý điểm danh
 */

/**
 * @swagger
 * /attendance:
 *   get:
 *     tags: [Attendances]
 *     summary: Lấy danh sách tất cả các điểm danh
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
router.get('/', getAllAttendances);

/**
 * @swagger
 * /attendance/{employee_id}:
 *   get:
 *     tags: [Attendances]
 *     summary: Lấy danh sách điểm danh theo mã nhân viên
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã nhân viên cần tìm điểm danh
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee_id:
 *                     type: integer
 *                     description: Mã nhân viên
 *                   id_attendance:
 *                     type: integer
 *                     description: ID chuyên cần
 *                   work_date:
 *                     type: string
 *                     format: date
 *                     description: Ngày làm việc
 *                   attendance_data:
 *                     type: object
 *                     description: Dữ liệu chuyên cần
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian tạo
 *                   created_by:
 *                     type: string
 *                     description: Người tạo
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian cập nhật
 *                   updated_by:
 *                     type: string
 *                     description: Người cập nhật
 *       404:
 *         description: Không tìm thấy điểm danh cho nhân viên này
 */
router.get('/:employee_id', getAttendancesByEmployeeId);

/**
 * @swagger
 * /attendance/{id_attendance}:
 *   put:
 *     tags: [Attendances]
 *     summary: Cập nhật thông tin điểm danh theo ID
 *     parameters:
 *       - in: path
 *         name: id_attendance
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của điểm danh cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               work_date:
 *                 type: string
 *                 format: date
 *               attendance_data:
 *                 type: object
 *                 description: Dữ liệu chuyên cần
 *               updated_by:
 *                 type: string
 *                 description: Người cập nhật thông tin
 *     responses:
 *       200:
 *         description: Điểm danh được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_id:
 *                   type: integer
 *                 work_date:
 *                   type: string
 *                   format: date
 *                 attendance_data:
 *                   type: object
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy điểm danh
 *       500:
 *         description: Lỗi hệ thống
 */
router.put('/:id_attendance', updateAttendance);


/**
 * @swagger
 * /attendance:
 *   post:
 *     tags: [Attendances]
 *     summary: Tạo một bản ghi điểm danh mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 description: Mã nhân viên
 *               work_date:
 *                 type: string
 *                 format: date
 *                 description: Ngày làm việc
 *               attendance_data:
 *                 type: object
 *                 description: Dữ liệu điểm danh (check_in, check_out, hours_worked)
 *               created_by:
 *                 type: string
 *                 description: Người tạo bản ghi điểm danh
 *     responses:
 *       201:
 *         description: Điểm danh được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_id:
 *                   type: integer
 *                 work_date:
 *                   type: string
 *                   format: date
 *                 attendance_data:
 *                   type: object
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 created_by:
 *                   type: string
 *       400:
 *         description: Thiếu dữ liệu hoặc dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi hệ thống
 */
router.post('/', createAttendance);


export default router;
