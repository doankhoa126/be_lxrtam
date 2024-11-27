import db from "../../config/db.js";

// Lấy danh sách tất cả các quy tắc tăng ca
export const getAllOvertimeRules = async (req, res) => {
  try {
    // Thực hiện truy vấn lấy dữ liệu
    const result = await db.query('SELECT * FROM overtime_rules');
    
    // Kiểm tra kết quả trả về
    console.log('Query result:', result);

    // Giải nén đúng dữ liệu từ kết quả trả về
    const results = result.rows;  // Dữ liệu thực tế trả về trong `rows` khi sử dụng PostgreSQL

    res.status(200).json(results);
  } catch (error) {
    // In ra lỗi chi tiết để debug
    console.error('Error fetching overtime rules:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error: error.message });
  }
};


// Lấy quy tắc tăng ca theo ID
export const getOvertimeRuleById = async (req, res) => {
  const { id } = req.params;
  try {
    // Truy vấn từ cơ sở dữ liệu
    const result = await db.query('SELECT * FROM overtime_rules WHERE id = $1', [id]);

    // Kiểm tra nếu không tìm thấy dữ liệu
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy quy tắc tăng ca' });
    }

    // Trả về dữ liệu
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching overtime rule:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error: error.message });
  }
};


// Thêm mới một quy tắc tăng ca
export const createOvertimeRule = async (req, res) => {
  const { created_by, standard_work_days_hours, overtime_hours, overtime_meal_hours, standard_work_days } = req.body;
  try {
    // Truy vấn với câu lệnh SQL INSERT, sử dụng RETURNING để lấy ID của bản ghi mới
    const result = await db.query(
      `INSERT INTO overtime_rules (created_by, standard_work_days_hours, overtime_hours, overtime_meal_hours, standard_work_days) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [created_by, standard_work_days_hours, overtime_hours, overtime_meal_hours, standard_work_days]
    );

    // Trả về ID của bản ghi mới và thông báo thành công
    res.status(201).json({
      message: 'Quy tắc tăng ca được tạo thành công',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error creating overtime rule:', error);
    res.status(500).json({ message: 'Lỗi khi tạo dữ liệu', error: error.message });
  }
};


// Cập nhật quy tắc tăng ca theo ID
export const updateOvertimeRule = async (req, res) => {
  const { id } = req.params;
  const { updated_by, standard_work_days_hours, overtime_hours, overtime_meal_hours, standard_work_days } = req.body;
  try {
    // Cập nhật thông tin quy tắc tăng ca trong bảng overtime_rules
    const result = await db.query(
      `UPDATE overtime_rules 
       SET updated_by = $1, standard_work_days_hours = $2, overtime_hours = $3, 
           overtime_meal_hours = $4, standard_work_days = $5, updated_at = NOW()
       WHERE id = $6 RETURNING id`,  // Sử dụng RETURNING để kiểm tra ID bản ghi đã được cập nhật
      [updated_by, standard_work_days_hours, overtime_hours, overtime_meal_hours, standard_work_days, id]
    );

    // Nếu không có bản ghi nào bị ảnh hưởng, trả về lỗi 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy quy tắc tăng ca để cập nhật' });
    }

    // Nếu có bản ghi bị ảnh hưởng, trả về thông báo thành công
    res.status(200).json({ message: 'Cập nhật quy tắc tăng ca thành công' });
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    console.error('Error updating overtime rule:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật dữ liệu', error: error.message });
  }
};


// Xóa quy tắc tăng ca theo ID
export const deleteOvertimeRule = async (req, res) => {
  const { id } = req.params;
  try {
    // Xóa quy tắc tăng ca theo ID
    const result = await db.query(
      'DELETE FROM overtime_rules WHERE id = $1 RETURNING id',  // Dùng RETURNING để kiểm tra bản ghi đã bị xóa
      [id]
    );

    // Nếu không có bản ghi nào bị xóa, trả về lỗi 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy quy tắc tăng ca để xóa' });
    }

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Xóa quy tắc tăng ca thành công' });
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    console.error('Error deleting overtime rule:', error);
    res.status(500).json({ message: 'Lỗi khi xóa dữ liệu', error: error.message });
  }
};
