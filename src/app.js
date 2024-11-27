import express, { json } from 'express';
import cors from 'cors';  // Import CORS
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import limiter from './middlewares/rateLimitMiddleware.js';
import { verifyToken } from './middlewares/authMiddleware.js'; 
import sanitizeInput from './middlewares/inputValidationMiddleware.js';

// Routes import
import attendanceRoutes from './routes/admin/attendanceRoutes.js';
import overtimeRuleRoutes from './routes/admin/overtimeRuleRoutes.js';
import salaryInfoRoutes from './routes/admin/salaryInfoRoutes.js';
import accCountEmployeeRoutes from './routes/admin/accountEmployeeRoutes.js';
import roleRoutes from './routes/admin/roleRoutes.js';
import employeeRoutes from './routes/admin/employeeRoutes.js';

const app = express();

// Middleware
app.use(json());

// Cấu hình CORS với options
const corsOptions = {
    origin: ['https://lxrtam.net', 'https://be.lxrtam.net'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions));  

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rate limiting và input sanitization
app.use(limiter);
app.use(sanitizeInput);

// Định nghĩa route cho các API chính, đã xác thực với verifyToken
app.use('/attendance',  attendanceRoutes); // Quản lý bảng attendance
app.use('/overtime-rules',  overtimeRuleRoutes); // Quản lý bảng overtime rules
app.use('/salary-info',  salaryInfoRoutes); // Quản lý bảng salary info
app.use('/accounts',  accCountEmployeeRoutes); // Quản lý tài khoản nhân viên
app.use('/roles', roleRoutes); // Quản lý vai trò người dùng
app.use('/employees',  employeeRoutes); // Quản lý thông tin nhân viên

export default app;
