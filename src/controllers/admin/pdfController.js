import poppler from 'pdf-poppler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertPdfToPng = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const outputDir = path.join(__dirname, '../../../uploads/data');
    const { fileName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Không có tệp nào được tải lên.' });
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Xử lý tên file
    const baseFileName = fileName || path.parse(req.file.originalname).name;
    const desiredOutputPath = path.join(outputDir, `${baseFileName}.png`);

    // Tạo một tên file tạm thời cho quá trình chuyển đổi
    const tempPrefix = `temp_${Date.now()}`;
    
    // Cấu hình chuyển đổi với tên file tạm thời
    const options = {
      format: 'png',
      out_dir: outputDir,
      out_prefix: tempPrefix,
      page: null
    };

    // Thực hiện chuyển đổi PDF sang PNG
    await poppler.convert(pdfPath, options);

    // Tìm file đã chuyển đổi (pdf-poppler thường thêm -1 vào cuối)
    const convertedFile = fs.readdirSync(outputDir)
      .find(file => file.startsWith(tempPrefix));

    if (!convertedFile) {
      throw new Error('Không tìm thấy file đã chuyển đổi');
    }

    const convertedPath = path.join(outputDir, convertedFile);

    // Kiểm tra xem file đích đã tồn tại chưa
    if (fs.existsSync(desiredOutputPath)) {
      // Nếu file đã tồn tại, tạo tên mới với hậu tố
      let counter = 1;
      let newPath;
      do {
        newPath = path.join(outputDir, `${baseFileName}-${counter}.png`);
        counter++;
      } while (fs.existsSync(newPath));
      
      // Đổi tên file tạm thành tên mới có hậu tố
      fs.renameSync(convertedPath, newPath);
      
      fs.unlinkSync(pdfPath);
      return res.status(200).json({
        message: 'PDF đã được chuyển đổi thành PNG.',
        fileName: path.basename(newPath)
      });
    }

    // Nếu file chưa tồn tại, đổi tên file tạm thành tên mong muốn
    fs.renameSync(convertedPath, desiredOutputPath);

    // Xóa file PDF sau khi chuyển đổi
    fs.unlinkSync(pdfPath);

    res.status(200).json({
      message: 'PDF đã được chuyển đổi thành PNG.',
      fileName: `${baseFileName}.png`
    });
  } catch (error) {
    console.error('Lỗi khi xử lý file:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý file.' });
  }
};