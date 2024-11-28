import express from 'express';
import { getRouterInfo, addRouter } from '../../controllers/user/routerIDController.js';

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

export default router;
