import db from "../../config/db.js";
import bcrypt from 'bcrypt'; // Dùng import thay vì require
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Đăng ký tài khoản và phân quyền
export const registerAccount = async (req, res) => {
  const { username, password, role_id, can_view, can_update, can_delete, can_create } = req.body;

  if (!username || !password || !role_id) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin, bao gồm username, password và role!' });
  }

  try {
    // Kiểm tra tài khoản đã tồn tại
    const userCheck = await db.query('SELECT * FROM accounts WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Tài khoản đã tồn tại!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm tài khoản vào database
    const result = await db.query(
      'INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING acc_id, username, created_at',
      [username, hashedPassword]
    );

    const newUserId = result.rows[0].acc_id;

    // Lấy thông tin role_name từ bảng roles dựa vào role_id
    const roleQuery = 'SELECT role_name FROM roles WHERE role_id = $1';
    const roleResult = await db.query(roleQuery, [role_id]);

    if (roleResult.rows.length === 0) {
      return res.status(400).json({ message: 'Vai trò không hợp lệ!' });
    }

    const departmentRoleName = roleResult.rows[0].role_name; // Lấy role_name để sử dụng làm department_role_name

    // Thêm vai trò và phân quyền cho tài khoản
    const accountRoleQuery = `
      INSERT INTO account_roles (acc_id, role_id, department_role_name, can_view, can_update, can_delete, can_create)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING acc_role_id, acc_id, role_id, department_role_name, can_view, can_update, can_delete, can_create
    `;

    const accountRoleResult = await db.query(accountRoleQuery, [
      newUserId,
      role_id,
      departmentRoleName, // Gửi role_name vào cột department_role_name
      can_view || true,  // Mặc định quyền xem là TRUE
      can_update || false, // Mặc định quyền cập nhật là FALSE
      can_delete || false, // Mặc định quyền xóa là FALSE
      can_create || false // Mặc định quyền tạo là FALSE
    ]);

    // Trả về kết quả
    return res.status(201).json({
      message: 'Đăng ký thành công và phân quyền hoàn tất!',
      account: result.rows[0],
      role: accountRoleResult.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi hệ thống!' });
  }
};




const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; 


export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ username và password!' });
  }

  try {
    // Kiểm tra tài khoản tồn tại
    const result = await db.query('SELECT * FROM accounts WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
    }

    // Kiểm tra mật khẩu
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng!' });
    }

    // Lấy role_id từ bảng account_roles
    const roleResult = await db.query('SELECT role_id FROM account_roles WHERE acc_id = $1', [user.acc_id]);
    if (roleResult.rows.length === 0) {
      return res.status(500).json({ message: 'Không tìm thấy vai trò của người dùng!' });
    }

    const role_id = roleResult.rows[0].role_id;

    // Tạo access token với role_id
    const token = jwt.sign({ userId: user.acc_id, username: user.username, role_id }, JWT_SECRET, { expiresIn: '1h' });

    // Trả về token và thông tin người dùng
    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        acc_id: user.acc_id,
        username: user.username,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi hệ thống!' });
  }
};
