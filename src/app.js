import cors from "cors";
import express, { json } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger.js";
// Routes import
import accCountEmployeeRoutes from "./routes/admin/accountEmployeeRoutes.js";
import attendanceRoutes from "./routes/admin/attendanceRoutes.js";
import billOfLadingRoutes from "./routes/admin/billOfLadingRoutes.js";
import employeeRoutes from "./routes/admin/employeeRoutes.js";
import imageRoutes from "./routes/admin/imageRoutes.js";
import overtimeRuleRoutes from "./routes/admin/overtimeRuleRoutes.js";
import pdfRoutes from "./routes/admin/pdfRoutes.js";
import roleRoutes from "./routes/admin/roleRoutes.js";
import salaryInfoRoutes from "./routes/admin/salaryInfoRoutes.js";
import registerRoutes from "./routes/user/accountRoutes.js";
import authenRoutes from "./routes/user/authRoutes.js";
import routerID from "./routes/user/routerIDRoutes.js";
import salaryEmployeeRoutes from "./routes/user/salaryEmployeeRoutes.js";
import goldInventoryRoutes from "./routes/admin/goldInventoryRoutes.js";
import goldInventorySumRoutes from "./routes/admin/goldInventorySumRoutes.js";

const app = express();

// Middleware
app.use(json());
const __dirname = path.resolve();

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("X-Frame-Options", "ALLOWALL");
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

// CORS Middleware
const corsOptions = {
  origin: [
    "https://lxrtam.net",
    "https://be.lxrtam.net",
    "https://tamlxrgr.lol",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5924",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Frame-Options"],
  credentials: true, // Enable credentials
};

app.use(cors(corsOptions)); // Áp dụng CORS
// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rate limiting và input sanitization
// app.use(limiter);
// app.use(sanitizeInput);
// app.use('/login',authenRoutes);
// Định nghĩa route cho các API chính, đã xác thực với verifyToken
app.use("/bills", billOfLadingRoutes); //Quản lý vận đơn bảng bill Of Lading
app.use("/attendance", attendanceRoutes); // Quản lý bảng attendance
app.use("/overtime-rules", overtimeRuleRoutes); // Quản lý bảng overtime rules
app.use("/salary-info", salaryInfoRoutes); // Quản lý bảng salary info
app.use("/accounts", accCountEmployeeRoutes); // Quản lý tài khoản nhân viên
app.use("/roles", roleRoutes); // Quản lý vai trò người dùng
app.use("/employees", employeeRoutes); // Quản lý thông tin nhân viên
app.use("/login", authenRoutes);
app.use("/router", routerID);
app.use("/salary", salaryEmployeeRoutes);
app.use("/api", imageRoutes);
app.use("/", pdfRoutes);
app.use("/", registerRoutes);
app.use("/", goldInventoryRoutes);
app.use("/", goldInventorySumRoutes);
//test commit
//test commit 2
export default app;
