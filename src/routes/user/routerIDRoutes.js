import express from 'express';
import { getRouterInfo, addRouter,checkRouterByEmployeeId } from '../../controllers/user/routerIDController.js';

const router = express.Router();



/**
 * @swagger
 * /router/{id_router}:
 *   get:
 *     summary: Get router information by ID
 *     description: Retrieve router details and the associated employee information.
 *     parameters:
 *       - in: path
 *         name: id_router
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the router
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_router:
 *                   type: string
 *                 employee_id:
 *                   type: string
 *                 link_salary_file:
 *                   type: string
 *                 name_salary_file:
 *                   type: string
 *       404:
 *         description: Router not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id_router', getRouterInfo);

/**
 * @swagger
 * /router:
 *   post:
 *     summary: Add a new router
 *     description: Create a new router record and associate it with an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_router:
 *                 type: string
 *                 example: ROUTER001
 *               employee_id:
 *                 type: string
 *                 example: EMP001
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_router:
 *                   type: string
 *                 employee_id:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', addRouter);

/**
 * @swagger
 * /router/check/{employee_id}:
 *   get:
 *     summary: Check if an employee has an assigned router
 *     description: Verify if the provided employee ID is already mapped to a router.
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Employee does not have an assigned router
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nhân viên chưa được gán router"
 *       400:
 *         description: Employee already has an assigned router
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nhân viên đã được gán router"
 *                 id_router:
 *                   type: string
 *                   example: "ROUTER001"
 *       500:
 *         description: Internal server error
 */
router.get('/check/:employee_id', checkRouterByEmployeeId);


export default router;
