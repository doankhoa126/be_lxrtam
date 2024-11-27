import rateLimit from 'express-rate-limit';

// Cấu hình middleware rate limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 60, // Tối đa 100 request mỗi IP trong khoảng thời gian trên
  message: 'Too many requests per minute',
  headers: true, // Trả về headers thông tin giới hạn cho client
});

export default limiter;
