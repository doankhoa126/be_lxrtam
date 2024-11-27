import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Only call once at the beginning of the file
const JWT_SECRET = process.env.JWT_SECRET; // Lấy secret key từ biến môi trường

export const mockAuthMiddleware = (req, res, next) => {
    const role = req.user?.role?.role_id; 
    if (!role) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.currentUserRole = role;
    next();
};

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.startsWith('Bearer ') 
        ? req.headers['authorization'].split(' ')[1] 
        : null;

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

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.startsWith('Bearer ') 
      ? req.headers['authorization'].split(' ')[1] 
      : null;

  if (!token) {
    return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập lại.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(403).json({ message: 'Token không hợp lệ.' });
  }
};
