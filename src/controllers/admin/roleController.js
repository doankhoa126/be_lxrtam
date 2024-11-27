import db from "../../config/db.js";

// Lấy danh sách tất cả vai trò
export const getAllRoles = async (req, res) => {
  try {
    const query = 'SELECT * FROM roles';
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách vai trò:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách vai trò', error: error.message });
  }
};

// Lấy thông tin vai trò theo ID
export const getRoleById = async (req, res) => {
  const { role_id } = req.params;

  try {
    const query = 'SELECT * FROM roles WHERE role_id = $1';
    const { rows } = await db.query(query, [role_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Lỗi khi lấy vai trò:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy vai trò', error: error.message });
  }
};

// Thêm mới vai trò
export const createRole = async (req, res) => {
  const { role_id, name_role, can_view, can_create, can_update, can_delete, all_department, created_by } = req.body;

  try {
    const query = `
      INSERT INTO roles (role_id, name_role, can_view, can_create, can_update, can_delete, all_department, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    await db.query(query, [role_id, name_role, can_view, can_create, can_update, can_delete, all_department, created_by]);
    res.status(201).json({ message: 'Tạo vai trò thành công' });
  } catch (error) {
    console.error('Lỗi khi tạo vai trò:', error.message);
    res.status(500).json({ message: 'Lỗi khi tạo vai trò', error: error.message });
  }
};


// Cập nhật vai trò theo ID
export const updateRole = async (req, res) => {
  const { role_id } = req.params;
  const { name_role, can_view, can_create, can_update, can_delete, all_department, modified_by } = req.body;

  try {
    const query = `
      UPDATE roles
      SET name_role = $1, can_view = $2, can_create = $3, can_update = $4, can_delete = $5, all_department = $6, modified_by = $7, modified_at = NOW()
      WHERE role_id = $8
    `;
    const { rowCount } = await db.query(query, [name_role, can_view, can_create, can_update, can_delete, all_department, modified_by, role_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò để cập nhật' });
    }

    res.status(200).json({ message: 'Cập nhật vai trò thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật vai trò:', error.message);
    res.status(500).json({ message: 'Lỗi khi cập nhật vai trò', error: error.message });
  }
};

// Xóa vai trò theo ID
export const deleteRole = async (req, res) => {
  const { role_id } = req.params;

  try {
    const query = 'DELETE FROM roles WHERE role_id = $1';
    const { rowCount } = await db.query(query, [role_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy vai trò để xóa' });
    }

    res.status(200).json({ message: 'Xóa vai trò thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa vai trò:', error.message);
    res.status(500).json({ message: 'Lỗi khi xóa vai trò', error: error.message });
  }
};
