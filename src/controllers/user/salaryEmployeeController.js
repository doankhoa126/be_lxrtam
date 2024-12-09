import db from "../../config/db.js";

// Lấy thông tin file lương của nhân viên
export const getSalaryInfo = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await db.query(`
      SELECT * FROM employee_salary_file
      WHERE employee_id = $1
    `, [employee_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Thông tin lương không tồn tại" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm thông tin file lương mới
export const addSalary = async (req, res) => {
  const { employee_id, link_salary_file, name_salary_file, time_salary_file } = req.body;

  try {
    const result = await db.query(`
      INSERT INTO employee_salary_file (employee_id, link_salary_file, name_salary_file, time_salary_file)
      VALUES ($1, $2, $3, $4)
      RETURNING employee_id, link_salary_file, name_salary_file
    `, [employee_id, link_salary_file, name_salary_file, time_salary_file]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi thêm thông tin lương" });
  }
};


export const updateStatus = async (req, res) => {
  const { employee_id, status } = req.body;

  try {
    // Cập nhật status cho bản ghi có created_at mới nhất
    const result = await db.query(
      `UPDATE public.employee_salary_file
       SET status = $1
       WHERE employee_id = $2
         AND created_at = (
           SELECT MAX(created_at)
           FROM public.employee_salary_file
           WHERE employee_id = $2
         )`,
      [status, employee_id]
    );

    if (result.rowCount > 0) {
      return res.status(200).json({ message: 'Cập nhật status thành công' });
    } else {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi để cập nhật' });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật status:', error);
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
};

// Lấy status của bản ghi mới nhất với employee_id
export const getStatus = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await db.query(`
      SELECT status
      FROM public.employee_salary_file
      WHERE employee_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `, [employee_id]);

    if (result.rows.length > 0) {
      return res.status(200).json({ status: result.rows[0].status });
    } else {
      return res.status(404).json({ message: 'Không tìm thấy status cho employee_id này' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy status:', error);
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
};
