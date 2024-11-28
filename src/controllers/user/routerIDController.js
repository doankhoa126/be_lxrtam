import db from "../../config/db.js";

// Lấy thông tin router và nhân viên tương ứng
export const getRouterInfo = async (req, res) => {
  const { id_router } = req.params;

  try {
    const result = await db.query(`
      SELECT 
        r.id_router, 
        r.employee_id, 
        s.link_salary_file, 
        s.name_salary_file
      FROM employee_router_mapping r
      JOIN employee_salary_file s ON r.employee_id = s.employee_id
      WHERE r.id_router = $1
    `, [id_router]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Router không tồn tại" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm thông tin router mới
export const addRouter = async (req, res) => {
  const { id_router, employee_id } = req.body;

  try {
    const result = await db.query(`
      INSERT INTO employee_router_mapping (id_router, employee_id)
      VALUES ($1, $2)
      RETURNING id_router, employee_id
    `, [id_router, employee_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi thêm router" });
  }
};
