import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Only call once at the beginning of the file
const JWT_SECRET = process.env.JWT_SECRET; // Lấy secret key từ biến môi trường

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Không có token, yêu cầu đăng nhập!' });
  }

  try {
    // Xác thực token và lấy dữ liệu từ token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Lưu thông tin người dùng từ token vào request
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token không hợp lệ!' });
  }
};

// Middleware kiểm tra phân quyền
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const { role_id } = req.user;  // Lấy role_id từ token

    if (!allowedRoles.includes(role_id)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này!' });
    }

    next();
  };
};
