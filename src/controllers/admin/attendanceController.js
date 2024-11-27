import db from "../../config/db.js";


// 1. Lấy tất cả dữ liệu điểm danh
export const getAllAttendances = async (req, res) => {
  try {
    // Truy vấn tất cả các điểm danh
    const { rows } = await db.query("SELECT * FROM attendance");

    // Kiểm tra xem rows có phải là mảng không
    if (!Array.isArray(rows)) {
      return res.status(500).json({ error: "Data is not iterable" });
    }

    // Trả về dữ liệu dưới dạng JSON nếu dữ liệu hợp lệ
    res.json(rows);
  } catch (err) {
    console.error("Error fetching attendances: ", err);
    res.status(500).json({ error: err.message });
  }
};



export const getAttendancesByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;

  try {
    // Truy vấn điểm danh theo employee_id
    const { rows } = await db.query(
      'SELECT * FROM attendance WHERE employee_id = $1',
      [employee_id]
    );

    // Kiểm tra xem có kết quả không
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance not found for this employee' });
    }

    // Trả về dữ liệu điểm danh
    res.json(rows);
  } catch (err) {
    console.error('Error fetching attendances for employee_id: ', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendance = async (req, res) => {
  const { id_attendance } = req.params;
  const { employee_id, work_date, attendance_data, updated_by } = req.body;

  try {
    // Kiểm tra xem id_attendance có tồn tại không
    const { rowCount } = await db.query('SELECT * FROM attendance WHERE id_attendance = $1', [id_attendance]);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    // Truy vấn để cập nhật bản ghi trong bảng attendance
    const updateQuery = `
      UPDATE attendance
      SET 
        employee_id = $1,
        work_date = $2,
        attendance_data = $3,
        updated_at = NOW(),
        updated_by = $4
      WHERE id_attendance = $5
      RETURNING *;
    `;
    const values = [employee_id, work_date, attendance_data, updated_by, id_attendance];

    const { rows } = await db.query(updateQuery, values);

    // Trả về bản ghi đã cập nhật
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ error: err.message });
  }
};


// Controller tạo mới điểm danh
export const createAttendance = async (req, res) => {
  const { employee_id, work_date, attendance_data, created_by } = req.body;

  try {
    // Truy vấn để tạo mới bản ghi trong bảng attendance
    const insertQuery = `
      INSERT INTO attendance (employee_id, work_date, attendance_data, created_at, created_by)
      VALUES ($1, $2, $3, NOW(), $4)
      RETURNING *;
    `;
    const values = [employee_id, work_date, attendance_data, created_by];

    const { rows } = await db.query(insertQuery, values);

    // Trả về bản ghi đã tạo
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating attendance:', err);
    res.status(500).json({ error: err.message });
  }
};
