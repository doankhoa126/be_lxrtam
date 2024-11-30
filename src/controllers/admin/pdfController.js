import path from 'path';
import multer from 'multer';

// Cấu hình Multer để lưu file PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/data/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file duy nhất
    }
});

// Kiểm tra chỉ cho phép upload file PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Chấp nhận file
    } else {
        cb(new Error('Only PDF files are allowed'), false); // Từ chối file khác
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
});

// Controller xử lý tải file PDF lên
export const uploadPDF = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }
    const filePath = `/data/${req.file.filename}`; // Đường dẫn file để load
    res.status(200).json({ message: 'PDF uploaded successfully', path: filePath });
};

// Controller xử lý load file PDF
export const loadPDF = (req, res) => {
    const fileName = req.params.fileName;
    const __dirname = path.resolve(); // ES6 không hỗ trợ __dirname trực tiếp
    const filePath = path.join(__dirname, 'uploads/data/', fileName);

    // Kiểm tra nếu file không tồn tại
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'PDF not found' });
        }
    });
};

export const pdfMiddleware = upload;
