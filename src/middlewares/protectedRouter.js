export const protectRoute = (roles = []) => {
    return (req, res, next) => {
        const { role } = req.user; // Giả sử bạn đã lấy thông tin người dùng sau khi xác thực token

        if (!role) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Nếu không có role hoặc role không nằm trong danh sách cho phép
        if (roles.length && !roles.includes(role)) {
            return res.status(403).json({ error: 'Access denied. You do not have permission to access this resource.' });
        }

        next();
    };
};


//Used
// import { protectRoute } from '../middlewares/protectMiddleware.js'; // Đường dẫn đến middleware bạn vừa tạo

// // Route chỉ cho phép owner
// router.post('/api/users', verifyToken, protectRoute(['owner']), createUser);

// // Route chỉ cho phép admin và owner
// router.get('/api/admin', verifyToken, protectRoute(['admin', 'owner']), adminFunction);
