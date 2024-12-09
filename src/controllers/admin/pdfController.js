import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPngFiles = async (req, res) => {
  try {
    const files = req.files; // Lấy danh sách các tệp từ request
    const outputDir = path.join(__dirname, "../../../uploads/data"); // Thư mục đích

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Không có tệp nào được tải lên." });
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    }

    const results = [];

    for (const file of files) {
      const filePath = file.path; // Đường dẫn tạm của tệp
      const fileName = path.parse(file.originalname).name; // Tên tệp không có phần mở rộng
      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, "_") + path.extname(file.originalname); // Tên tệp hợp lệ
      const destinationPath = path.join(outputDir, sanitizedFileName); // Đường dẫn đến file đích

      try {
        fs.renameSync(filePath, destinationPath); // Di chuyển file đến thư mục đích

        results.push({
          fileName: file.originalname,
          savedAs: sanitizedFileName,
          outputPath: destinationPath,
        });
      } catch (err) {
        console.error(`Lỗi khi lưu file ${file.originalname}: ${err.message}`);
        results.push({
          fileName: file.originalname,
          error: "Không thể lưu tệp.",
        });
      }
    }

    res.status(200).json({
      message: "Tải lên tệp hoàn tất.",
      results,
    });
  } catch (error) {
    console.error("Lỗi khi xử lý tệp:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình xử lý tệp." });
  }
};
