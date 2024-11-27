import db from "../../config/db.js";


// Lấy tất cả nhân viên
export const getAllEmployees = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM employee');
    if (!results) {
      return res.status(404).json({ message: 'Không có nhân viên nào' });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu nhân viên', error: error.message });
  }
};


// Lấy thông tin nhân viên theo ID
export const getEmployeeById = async (req, res) => {
  const { employee_id } = req.params;
  
  try {
    // Truy vấn cơ sở dữ liệu
    const result = await db.query('SELECT * FROM employee WHERE employee_id = $1', [employee_id]);
    
    // Kiểm tra nếu không có dữ liệu trả về
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }

    // Trả về nhân viên tìm thấy
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu nhân viên:', error.stack);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu nhân viên', error: error.stack });
  }
};




// Thêm mới nhân viên
export const createEmployee = async (req, res) => {
  const {
    employee_id, full_name, department, position, level, gender,
    date_of_birth, phone_number, email, hire_date, contract_type,
    current_address, education_level, bank_account_number, bank_name,
    tax_id, health_insurance_number, social_insurance_number,
    emergency_contact_name, emergency_contact_phone, created_by
  } = req.body;

  try {
    // Đảm bảo số lượng cột và giá trị phải khớp
    const query = `
      INSERT INTO employee (
        employee_id, full_name, department, position, level, gender,
        date_of_birth, phone_number, email, hire_date, contract_type,
        current_address, education_level, bank_account_number, bank_name,
        tax_id, health_insurance_number, social_insurance_number,
        emergency_contact_name, emergency_contact_phone, created_by
      ) 
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11,
        $12, $13, $14, $15,
        $16, $17, $18,
        $19, $20, $21
      )
    `;
    
    const values = [
      employee_id, full_name, department, position, level, gender,
      date_of_birth, phone_number, email, hire_date, contract_type,
      current_address, education_level, bank_account_number, bank_name,
      tax_id, health_insurance_number, social_insurance_number,
      emergency_contact_name, emergency_contact_phone, created_by
    ];
    
    const result = await db.query(query, values);
    
    res.status(201).json({
      message: 'Nhân viên được tạo thành công',
      employee_id: result.rows[0].employee_id,
    });
  } catch (error) {
    console.error('Lỗi khi tạo nhân viên:', error);
    res.status(500).json({ message: 'Lỗi khi tạo nhân viên', error: error.message });
  }
};

// Cập nhật thông tin nhân viên
export const updateEmployee = async (req, res) => {
  const { employee_id } = req.params;
  const {
    full_name, department, position, level, gender, date_of_birth, phone_number, email,
    hire_date, contract_type, current_address, education_level, bank_account_number, bank_name,
    tax_id, health_insurance_number, social_insurance_number, emergency_contact_name,
    emergency_contact_phone, modified_by
  } = req.body;

  try {
    const query = `
      UPDATE employee
      SET 
        full_name = $1, department = $2, position = $3, level = $4, gender = $5,
        date_of_birth = $6, phone_number = $7, email = $8, hire_date = $9, contract_type = $10,
        current_address = $11, education_level = $12, bank_account_number = $13, bank_name = $14,
        tax_id = $15, health_insurance_number = $16, social_insurance_number = $17,
        emergency_contact_name = $18, emergency_contact_phone = $19, modified_by = $20
      WHERE employee_id = $21
    `;

    const values = [
      full_name, department, position, level, gender, date_of_birth, phone_number, email, hire_date,
      contract_type, current_address, education_level, bank_account_number, bank_name, tax_id,
      health_insurance_number, social_insurance_number, emergency_contact_name, emergency_contact_phone, modified_by, employee_id
    ];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
    }

    res.status(200).json({ message: 'Cập nhật thông tin nhân viên thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin nhân viên:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin nhân viên', error: error.message });
  }
};


// Xóa nhân viên theo ID
export const deleteEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const query = `
      DELETE FROM employee 
      WHERE employee_id = $1
    `;
    
    const result = await db.query(query, [employee_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }

    res.status(200).json({ message: 'Xóa nhân viên thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu nhân viên:', error);
    res.status(500).json({ message: 'Lỗi khi xóa dữ liệu nhân viên', error: error.message });
  }
};
