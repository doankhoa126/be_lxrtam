import express, { json } from 'express';
import cors from 'cors';  // Import the CORS package

// import userRoutes from './routes/userRoutes.js';
// import departmentRoutes from './routes/departmentRoutes.js';
// import { mockAuthMiddleware } from './middlewares/authMiddleware.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import limiter from './middlewares/rateLimitMiddleware.js';
import { verifyToken } from './middlewares/authMiddleware.js'; // Dùng middleware xác thực token
import sanitizeInput from './middlewares/inputValidationMiddleware.js';
import attendanceRoutes from './routes/admin/attendanceRoutes.js';
import overtimeRuleRoutes from './routes/admin/overtimeRuleRoutes.js';
import salaryInfoRoutes from './routes/admin/salaryInfoRoutes.js';
import accCountEmployeeRoutes from './routes/admin/accountEmployeeRoutes.js';
import roleRoutes from './routes/admin/roleRoutes.js';
import employeeRoutes from './routes/admin/employeeRoutes.js';

const app = express();
app.use(json());
app.use(cors());

// Cấu hình Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Cấu hình rate-limiting và sanitization middleware
app.use(limiter); 
app.use(sanitizeInput);

// Sử dụng middleware xác thực token
// Cần phải xác thực người dùng trước khi truy cập vào các route chính
// app.use(authRoutes); // Có thể uncomment khi bạn có authRoutes (chẳng hạn: đăng nhập, đăng ký)

// Định nghĩa route cho các API chính, đã xác thực với verifyToken
app.use('/attendance',  attendanceRoutes); // Quản lý bảng attendance
app.use('/overtime-rules',  overtimeRuleRoutes); // Quản lý bảng overtime rules
app.use('/salary-info',  salaryInfoRoutes); // Quản lý bảng salary info
app.use('/accounts',  accCountEmployeeRoutes); // Quản lý tài khoản nhân viên
app.use('/roles', roleRoutes); // Quản lý vai trò người dùng
app.use('/employees',  employeeRoutes); // Quản lý thông tin nhân viên

export default app;
