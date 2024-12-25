import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../../config/db.js";

dotenv.config();

// Lấy JWT_SECRET và JWT_EXPIRES_IN từ biến môi trường
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // Mặc định là 1 giờ nếu không có trong .env

// Hàm xử lý login
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.",
    });
  }

  try {
    // Kiểm tra tài khoản và lấy thông tin role
    const accountQuery = `
      SELECT a.*, ar.role_id, ar.department_role_name, 
             ar.can_view, ar.can_update, ar.can_delete, ar.can_create
      FROM accounts a
      LEFT JOIN account_roles ar ON a.acc_id = ar.acc_id
      WHERE a.username = $1
    `;

    const result = await db.query(accountQuery, [username]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Tài khoản không tồn tại." });
    }

    const account = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Sai mật khẩu." });
    }

    // Tạo token với đầy đủ thông tin permissions
    const token = jwt.sign(
      {
        userId: account.acc_id,
        username: account.username,
        role_id: account.role_id,
        permissions: {
          can_view: account.can_view,
          can_update: account.can_update,
          can_delete: account.can_delete,
          can_create: account.can_create,
        },
        department_role_name: account.department_role_name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
      user: {
        acc_id: account.acc_id,
        username: account.username,
        role_id: account.role_id,
        department_role_name: account.department_role_name,
        permissions: {
          can_view: account.can_view,
          can_update: account.can_update,
          can_delete: account.can_delete,
          can_create: account.can_create,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Lỗi hệ thống. Vui lòng thử lại sau.",
      error: error.message,
    });
  }
};
