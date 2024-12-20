import express from "express";
import { login } from "../../controllers/user/authController.js";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates the user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", login); // Changed from '/login' to '/'
export default router;
