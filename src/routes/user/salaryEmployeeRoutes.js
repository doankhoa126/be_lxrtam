import express from 'express';
import { getSalaryInfo, addSalary } from '../../controllers/user/salaryEmployeeController.js';

const router = express.Router();

/**
 * @swagger
 * /salary/{employee_id}:
 *   get:
 *     summary: Get salary information for an employee
 *     description: Retrieve salary details for the specified employee by employee_id.
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_id:
 *                   type: string
 *                 link_salary_file:
 *                   type: string
 *                 name_salary_file:
 *                   type: string
 *                 time_salary_file:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/:employee_id', getSalaryInfo);

/**
 * @swagger
 * /salary:
 *   post:
 *     summary: Add a new salary record
 *     description: Add salary information for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 example: EMP001
 *               link_salary_file:
 *                 type: string
 *                 example: /files/salary_EMP001.pdf
 *               name_salary_file:
 *                 type: string
 *                 example: salary_EMP001.pdf
 *               time_salary_file:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-11-01T12:00:00
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_id:
 *                   type: string
 *                 link_salary_file:
 *                   type: string
 *                 name_salary_file:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', addSalary);

export default router;
