// Import database configuration
import db from "../../config/db.js";

// Lấy tất cả nhân viên
export const getAllEmployees = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM employee');
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Không có nhân viên nào' });
    }
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu nhân viên', error: error.message });
  }
};

// Lấy thông tin nhân viên theo ID
export const getEmployeeById = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await db.query('SELECT * FROM employee WHERE employee_id = $1', [employee_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }

    // Chuyển đổi các cột kiểu DATE thành định dạng YYYY-MM-DD
    const employee = result.rows[0];
    if (employee.date_of_birth) {
      employee.date_of_birth = new Date(employee.date_of_birth).toISOString().split('T')[0];
    }
    if (employee.start_date) {
      employee.start_date = new Date(employee.start_date).toISOString().split('T')[0];
    }
    if (employee.issue_date) {
      employee.issue_date = new Date(employee.issue_date).toISOString().split('T')[0];
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu nhân viên:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu nhân viên', error: error.message });
  }
};
// Thêm mới nhân viên
export const createEmployee = async (req, res) => {
  const {
    employee_id, full_name, department, position, rank, division, direct_manager,
    gender, date_of_birth, phone_number, email, status, contract_type,
    permanent_address, current_address, issue_date, issue_place,
    bank_account_number, bank_name, tax_code, health_insurance_number,
    social_insurance_number, emergency_contact_info, emergency_contact_address,
    emergency_contact_phone, created_by
  } = req.body;

  try {
    const query = `
      INSERT INTO employee (
        employee_id, full_name, department, position, rank, division, direct_manager,
        gender, date_of_birth, phone_number, email, status, contract_type,
        permanent_address, current_address, issue_date, issue_place,
        bank_account_number, bank_name, tax_code, health_insurance_number,
        social_insurance_number, emergency_contact_info, emergency_contact_address,
        emergency_contact_phone, created_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25
      ) RETURNING *
    `;

    const values = [
      employee_id, full_name, department, position, rank, division, direct_manager,
      gender, date_of_birth, phone_number, email, status, contract_type,
      permanent_address, current_address, issue_date, issue_place,
      bank_account_number, bank_name, tax_code, health_insurance_number,
      social_insurance_number, emergency_contact_info, emergency_contact_address,
      emergency_contact_phone, created_by
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: 'Nhân viên được tạo thành công',
      employee: result.rows[0]
    });
  } catch (error) {
    console.error('Lỗi khi tạo nhân viên:', error.message);
    res.status(500).json({ message: 'Lỗi khi tạo nhân viên', error: error.message });
  }
};

// Cập nhật thông tin nhân viên
export const updateEmployee = async (req, res) => {
  const { employee_id } = req.params;
  const {
    full_name, department, position, rank, division, direct_manager,
    gender, date_of_birth, phone_number, email, status, contract_type,
    permanent_address, current_address, issue_date, issue_place,
    bank_account_number, bank_name, tax_code, health_insurance_number,
    social_insurance_number, emergency_contact_info, emergency_contact_address,
    emergency_contact_phone, modified_by
  } = req.body;

  try {
    const query = `
      UPDATE employee
      SET 
        full_name = $1, department = $2, position = $3, rank = $4, division = $5,
        direct_manager = $6, gender = $7, date_of_birth = $8, phone_number = $9,
        email = $10, status = $11, contract_type = $12, permanent_address = $13,
        current_address = $14, issue_date = $15, issue_place = $16,
        bank_account_number = $17, bank_name = $18, tax_code = $19,
        health_insurance_number = $20, social_insurance_number = $21,
        emergency_contact_info = $22, emergency_contact_address = $23,
        emergency_contact_phone = $24, modified_by = $25
      WHERE employee_id = $26
    `;

    const values = [
      full_name, department, position, rank, division, direct_manager,
      gender, date_of_birth, phone_number, email, status, contract_type,
      permanent_address, current_address, issue_date, issue_place,
      bank_account_number, bank_name, tax_code, health_insurance_number,
      social_insurance_number, emergency_contact_info, emergency_contact_address,
      emergency_contact_phone, modified_by, employee_id
    ];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
    }

    res.status(200).json({ message: 'Cập nhật thông tin nhân viên thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin nhân viên:', error.message);
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin nhân viên', error: error.message });
  }
};

// Xóa nhân viên theo ID
export const deleteEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const query = 'DELETE FROM employee WHERE employee_id = $1';

    const result = await db.query(query, [employee_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }

    res.status(200).json({ message: 'Xóa nhân viên thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu nhân viên:', error.message);
    res.status(500).json({ message: 'Lỗi khi xóa dữ liệu nhân viên', error: error.message });
  }
};
