import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Hàm login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra xem tài khoản có tồn tại không
    const result = await db.query('SELECT * FROM account_employee WHERE username = $1', [username]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' });
    }

    const account = result.rows[0];

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { account_id: account.account_id, username: account.username, id_role: account.id_role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }  // Token hết hạn sau 1 giờ hoặc theo cấu hình trong .env
    );

    // Trả về token và thông tin người dùng (tuỳ chọn)
    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      account_id: account.account_id,
      username: account.username,
      id_role: account.id_role
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
  }
};
