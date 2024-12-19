import express, { json } from 'express';
import cors from 'cors';  // Import CORS
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import { verifyToken } from './middlewares/authMiddleware.js'; 
import sanitizeInput from './middlewares/inputValidationMiddleware.js';
import path from 'path';

// Routes import
import attendanceRoutes from './routes/admin/attendanceRoutes.js';
import overtimeRuleRoutes from './routes/admin/overtimeRuleRoutes.js';
import salaryInfoRoutes from './routes/admin/salaryInfoRoutes.js';
import accCountEmployeeRoutes from './routes/admin/accountEmployeeRoutes.js';
import roleRoutes from './routes/admin/roleRoutes.js';
import employeeRoutes from './routes/admin/employeeRoutes.js';
import authenRoutes from './routes/user/authRoutes.js';
import salaryEmployeeRoutes from './routes/user/salaryEmployeeRoutes.js';
import routerID from './routes/user/routerIDRoutes.js';
import imageRoutes from './routes/admin/imageRoutes.js';
import pdfRoutes from './routes/admin/pdfRoutes.js'
import registerRoutes from './routes/user/accountRoutes.js';

const app = express();

// Middleware
app.use(json());
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS Middleware
const corsOptions = {
    origin: ['https://lxrtam.net', 'https://be.lxrtam.net', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:5924'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));  // Apply CORS middleware globally

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// API Routes
app.use('/attendance', attendanceRoutes);
app.use('/overtime-rules', overtimeRuleRoutes);
app.use('/salary-info', salaryInfoRoutes);
app.use('/accounts', accCountEmployeeRoutes);
app.use('/roles', roleRoutes);
app.use('/employees', employeeRoutes);
app.use('/login', authenRoutes);
app.use('/router', routerID);
app.use('/salary', salaryEmployeeRoutes);
app.use('/api', imageRoutes);
app.use('/', pdfRoutes);
app.use('/', registerRoutes);

export default app;