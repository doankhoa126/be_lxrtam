import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

// Lấy JWT_SECRET và JWT_EXPIRES_IN từ biến môi trường
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Mặc định là 1 giờ nếu không có trong .env

// Hàm xử lý login
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' });
  }

  try {
    // 1. Kiểm tra xem tài khoản có tồn tại trong database
    const result = await db.query('SELECT * FROM account_employee WHERE username = $1', [username]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
    }

    const account = result.rows[0];

    // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong database
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Sai mật khẩu.' });
    }

    // 3. Tạo token JWT
    const token = jwt.sign(
      { account_id: account.account_id, username: account.username, id_role: account.id_role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } // Token hết hạn dựa trên cấu hình
    );

    // 4. Trả về thông tin đăng nhập thành công
    res.status(200).json({
      message: 'Đăng nhập thành công.',
      token, // Token để xác thực
      user: {
        account_id: account.account_id,
        username: account.username,
        id_role: account.id_role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Lỗi hệ thống. Vui lòng thử lại sau.', error });
  }
};
