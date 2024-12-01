import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Cấu hình Multer để lưu ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/data/'); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        const uploadPath = path.join('uploads/data/', file.originalname);

        // Kiểm tra nếu file đã tồn tại
        if (fs.existsSync(uploadPath)) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newName = `${uniqueSuffix}${path.extname(file.originalname)}`;
            cb(null, newName); // Tạo tên mới nếu file đã tồn tại
        } else {
            cb(null, file.originalname); // Lưu với tên gốc nếu không trùng lặp
        }
    }
});

const upload = multer({ storage: storage });

// Controller xử lý tải ảnh lên
export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = `/data/${req.file.filename}`; // Đường dẫn ảnh để load
    res.status(200).json({ message: 'Image uploaded successfully', path: filePath });
};

// Controller xử lý load ảnh
export const loadImage = (req, res) => {
    const fileName = req.params.imageName;
    const __dirname = path.resolve(); // ES6 không hỗ trợ __dirname trực tiếp
    const filePath = path.join(__dirname, 'uploads/data/', fileName);

    // Kiểm tra nếu file không tồn tại
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'Image not found' });
        }
    });
};

export const imageMiddleware = upload;