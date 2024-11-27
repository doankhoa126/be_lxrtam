import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Lấy secret key từ biến môi trường

export const mockAuthMiddleware = (req, res, next) => {
    // Lấy role từ header để giả lập xác thực
    // Lấy role từ req.user
    const role = req.user?.role?.role_id; // Sử dụng Optional Chaining để tránh lỗi nếu req.user hoặc req.user.role không tồn tại
    if (!role) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.currentUserRole = role; // Lưu role vào request
    next();
};



export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization
    if (!token) {
        return res.status(401).json({ error: 'Access token is missing.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        req.user = decoded; // Lưu thông tin user vào request
        next();
    });
};

