// inputValidationMiddleware.js
export const validateLoginInput = (req, res, next) => {
    const { username, password } = req.body;

    // Kiểm tra nếu username và password không được cung cấp
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ error: 'Username is required and must be a non-empty string.' });
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ error: 'Password is required and must be a non-empty string.' });
    }

    // Nếu tất cả điều kiện được thoả mãn, tiếp tục xử lý
    next();
};


// Middleware để kiểm tra nội dung đầu vào cho các chuỗi đáng ngờ
export  const sanitizeInput = (req, res, next) => {
    const suspiciousPatterns = /<script|>|<|{|}|\$|%|eval|javascript|onerror|alert|href|src|data:/i;

    // Kiểm tra các trường trong body, query, và params
    const checkForSuspiciousContent = (input) => {
        if (typeof input === 'string') {
            return suspiciousPatterns.test(input);
        }
        if (typeof input === 'object' && input !== null) {
            return Object.values(input).some(checkForSuspiciousContent);
        }
        return false;
    };

    if (
        checkForSuspiciousContent(req.body) ||
        checkForSuspiciousContent(req.query) ||
        checkForSuspiciousContent(req.params)
    ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid input detected.',
        });
    }

    // Nếu không phát hiện, tiếp tục với các middleware tiếp theo
    next();
};

export default sanitizeInput;
