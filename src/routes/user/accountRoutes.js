import express from 'express';
import { registerAccount, login } from '../../controllers/user/accountController.js';
import { checkRole, verifyToken} from '../../middlewares/authMiddleware.js';
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user account with a role and permissions
 *     tags:
 *       - Authentication
 *     description: Registers a new user account and assigns a role with specific permissions, including the department role name derived from the role name. Optionally, specify the department role name during registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: new_user
 *               password:
 *                 type: string
 *                 example: secure_password
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               department_role_name:
 *                 type: string
 *                 example: "Bộ phận thiết kế"
 *                 description: "The name of the department role, derived from the role name. If not provided, it will be set automatically based on the role."
 *               can_view:
 *                 type: boolean
 *                 example: true
 *               can_update:
 *                 type: boolean
 *                 example: false
 *               can_delete:
 *                 type: boolean
 *                 example: false
 *               can_create:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: User account created and role assigned successfully, including department role name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 account:
 *                   type: object
 *                   properties:
 *                     acc_id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                 role:
 *                   type: object
 *                   properties:
 *                     acc_role_id:
 *                       type: integer
 *                     acc_id:
 *                       type: integer
 *                     role_id:
 *                       type: integer
 *                     department_role_name:
 *                       type: string
 *                       description: "The name of the department role derived from the role"
 *                     can_view:
 *                       type: boolean
 *                     can_update:
 *                       type: boolean
 *                     can_delete:
 *                       type: boolean
 *                     can_create:
 *                       type: boolean
 *       400:
 *         description: Invalid input data (e.g., missing username, password, or role_id)
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerAccount);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and generate an access token
 *     tags:
 *       - Authentication
 *     description: Authenticates the user and generates a JWT token that can be used to access protected resources.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: A protected route that requires authentication and authorization
 *     tags:
 *       - Protected Route
 *     description: A route that is only accessible to users with specific roles.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to protected resource
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', verifyToken, checkRole([1, 2]), (req, res) => {
    res.status(200).json({ message: 'Access granted to protected resource!' });
  });

export default router;
