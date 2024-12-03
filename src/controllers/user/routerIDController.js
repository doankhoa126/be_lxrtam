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

// Kiểm tra xem employee_id đã có router hay chưa
export const checkRouterByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await db.query(`
      SELECT id_router 
      FROM employee_router_mapping 
      WHERE employee_id = $1
    `, [employee_id]);

    if (result.rows.length > 0) {
      // Nếu employee_id đã có router
      return res.status(400).json({
        message: "Nhân viên này đã có mã xem lương",
        id_router: result.rows[0].id_router
      });
    }

    // Nếu employee_id chưa có router
    res.json({ message: "Nhân viên chưa có mã xem lương" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
