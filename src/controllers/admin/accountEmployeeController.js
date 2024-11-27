import db from "../../config/db.js";
import bcrypt from 'bcryptjs';

// Lấy danh sách tất cả tài khoản nhân viên

export const getAllAccounts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM account_employee');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

// Lấy tài khoản nhân viên theo ID
export const getAccountById = async (req, res) => {
  const { account_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM account_employee WHERE account_id = $1', [account_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

// Tạo mới tài khoản nhân viên


export const createAccount = async (req, res) => {
  const { id_role, employee_id, username, password, description, created_by } = req.body;

  try {
    // Check if the id_role exists
    const roleResult = await db.query('SELECT 1 FROM "roles" WHERE "role_id" = $1', [id_role]);
    if (roleResult.rowCount === 0) {
      return res.status(400).json({ message: 'Role không tồn tại' });
    }

    // Check if the employee_id exists
    const employeeResult = await db.query('SELECT 1 FROM "employee" WHERE "employee_id" = $1', [employee_id]);
    if (employeeResult.rowCount === 0) {
      return res.status(400).json({ message: 'Employee không tồn tại' });
    }

    // Check if the username already exists
    const usernameResult = await db.query('SELECT 1 FROM "account_employee" WHERE "username" = $1', [username]);
    if (usernameResult.rowCount > 0) {
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);  // The number '10' is the salt rounds (adjustable)

    // Insert the new account
    const result = await db.query(
      `INSERT INTO "account_employee" ("id_role", "employee_id", "username", "password", "description", "created_by") 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING "account_id"`,
      [id_role, employee_id, username, hashedPassword, description, created_by]
    );

    res.status(201).json({ message: 'Tạo tài khoản thành công', account_id: result.rows[0].account_id });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Lỗi khi tạo tài khoản', error: error.message });
  }
};

// Cập nhật tài khoản nhân viên
export const updateAccount = async (req, res) => {
  const { account_id } = req.params;
  const { id_role, employee_id, username, password, description, updated_by } = req.body;
  try {
    const result = await db.query(
      `UPDATE account_employee 
       SET id_role = $1, employee_id = $2, username = $3, password = $4, description = $5, updated_by = $6, updated_at = NOW() 
       WHERE account_id = $7`,
      [id_role, employee_id, username, password, description, updated_by, account_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản để cập nhật' });
    }
    res.status(200).json({ message: 'Cập nhật tài khoản thành công' });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật tài khoản', error });
  }
};

// Xóa tài khoản nhân viên
export const deleteAccount = async (req, res) => {
  const { account_id } = req.params;
  try {
    const result = await db.query('DELETE FROM account_employee WHERE account_id = $1', [account_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản để xóa' });
    }
    res.status(200).json({ message: 'Xóa tài khoản thành công' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Lỗi khi xóa tài khoản', error });
  }
};