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
