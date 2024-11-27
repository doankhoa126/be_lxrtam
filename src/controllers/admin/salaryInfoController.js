import db from "../../config/db.js";

// Lấy danh sách tất cả thông tin lương
export const getAllSalaryInfo = async (req, res) => {
  try {
    const queryResult = await db.query('SELECT * FROM salary_info');
    console.log('Query Result:', queryResult); // Log the result for debugging
    const results = queryResult.rows;
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching salary information:", error.message);
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách thông tin lương',
      error: error.message,
    });
  }
};

export const getSalaryInfoById = async (req, res) => {
  const { salary_info_id } = req.params;

  if (!salary_info_id) {
    return res.status(400).json({ message: "Invalid salary_info_id parameter" });
  }

  try {
    const queryResult = await db.query('SELECT * FROM salary_info WHERE employee_id = $1', [salary_info_id]);
    console.log('Query Result:', queryResult); // Log the result for debugging
    const results = queryResult.rows;

    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin lương' });
    }

    const salaryInfo = results[0];

    const tryParseJSON = (jsonString) => {
      try {
        return typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return jsonString;
      }
    };

    salaryInfo.base_salary = tryParseJSON(salaryInfo.base_salary);
    salaryInfo.actual_salary = tryParseJSON(salaryInfo.actual_salary);
    salaryInfo.actual_work_days = tryParseJSON(salaryInfo.actual_work_days);
    salaryInfo.meal_allowance = tryParseJSON(salaryInfo.meal_allowance);
    salaryInfo.overtime_total = tryParseJSON(salaryInfo.overtime_total);
    salaryInfo.overtime_meal = tryParseJSON(salaryInfo.overtime_meal);
    salaryInfo.other_bonus = tryParseJSON(salaryInfo.other_bonus);
    salaryInfo.overtime_hours_x1_5 = tryParseJSON(salaryInfo.overtime_hours_x1_5);
    salaryInfo.overtime_hours_x2 = tryParseJSON(salaryInfo.overtime_hours_x2);
    salaryInfo.overtime_hours_x3 = tryParseJSON(salaryInfo.overtime_hours_x3);
    salaryInfo.kpi_bonus = tryParseJSON(salaryInfo.kpi_bonus);
    salaryInfo.kpi_penalty = tryParseJSON(salaryInfo.kpi_penalty);
    salaryInfo.salary_advance = tryParseJSON(salaryInfo.salary_advance);
    salaryInfo.loan_payment = tryParseJSON(salaryInfo.loan_payment);
    salaryInfo.hourly_wage = tryParseJSON(salaryInfo.hourly_wage);

    res.status(200).json(salaryInfo);
  } catch (error) {
    console.error("Error fetching salary info by ID:", error.message);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin lương', error: error.message });
  }
};




// Thêm mới thông tin lương
export const createSalaryInfo = async (req, res) => {
  const {
    employee_id,
    base_salary,
    actual_salary,
    actual_work_days,
    meal_allowance,
    overtime_total,
    overtime_meal,
    other_bonus,
    overtime_hours_x1_5,
    overtime_hours_x2,
    overtime_hours_x3,
    kpi_bonus,
    kpi_penalty,
    salary_advance,
    loan_payment,
    hourly_wage,
    total_salary,
    created_by,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO salary_info 
      (employee_id, base_salary, actual_salary, actual_work_days, meal_allowance, overtime_total, 
       overtime_meal, other_bonus, overtime_hours_x1_5, overtime_hours_x2, overtime_hours_x3, kpi_bonus, kpi_penalty, 
       salary_advance, loan_payment, hourly_wage, total_salary, created_by) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [
        employee_id,
        JSON.stringify(base_salary),
        JSON.stringify(actual_salary),
        JSON.stringify(actual_work_days),
        JSON.stringify(meal_allowance),
        JSON.stringify(overtime_total),
        JSON.stringify(overtime_meal),
        JSON.stringify(other_bonus),
        JSON.stringify(overtime_hours_x1_5),
        JSON.stringify(overtime_hours_x2),
        JSON.stringify(overtime_hours_x3),
        JSON.stringify(kpi_bonus),
        JSON.stringify(kpi_penalty),
        JSON.stringify(salary_advance),
        JSON.stringify(loan_payment),
        JSON.stringify(hourly_wage),
        total_salary,
        created_by,
      ]
    );
    res.status(201).json({ message: 'Thông tin lương được tạo thành công' });
  } catch (error) {
    console.error("Error creating salary info:", error.message);
    res.status(500).json({ message: 'Lỗi khi tạo thông tin lương', error: error.message });
  }
};


// Cập nhật thông tin lương theo ID
export const updateSalaryInfo = async (req, res) => {
  const { employee_id } = req.params; // Lấy employee_id từ URL params
  console.log(employee_id);
  const {
    base_salary,
    actual_salary,
    actual_work_days,
    meal_allowance,
    overtime_total,
    overtime_meal,
    other_bonus,
    overtime_hours_x1_5,
    overtime_hours_x2,
    overtime_hours_x3,
    kpi_bonus,
    kpi_penalty,
    salary_advance,
    loan_payment,
    hourly_wage,
    total_salary,
    updated_by,
  } = req.body;

  try {
    // Sử dụng các giá trị từ các trường JSON
    const queryResult = await db.query(
      `UPDATE salary_info 
      SET base_salary = $1, actual_salary = $2, actual_work_days = $3, meal_allowance = $4, overtime_total = $5, 
          overtime_meal = $6, other_bonus = $7, overtime_hours_x1_5 = $8, overtime_hours_x2 = $9, overtime_hours_x3 = $10, 
          kpi_bonus = $11, kpi_penalty = $12, salary_advance = $13, loan_payment = $14, hourly_wage = $15, total_salary = $16, 
          updated_by = $17
      WHERE employee_id = $18`,  // Sử dụng employee_id làm điều kiện tìm kiếm
      [
        base_salary.value,  // Lấy giá trị từ "value"
        actual_salary.value,
        actual_work_days.value,
        meal_allowance.value,
        overtime_total.value,
        overtime_meal.value,
        other_bonus.value,
        overtime_hours_x1_5.value,
        overtime_hours_x2.value,
        overtime_hours_x3.value,
        kpi_bonus.value,
        kpi_penalty.value,
        salary_advance.value,
        loan_payment.value,
        hourly_wage.value,
        total_salary,
        updated_by,
        employee_id,  // Dùng employee_id làm điều kiện tìm kiếm
      ]
    );
    
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin lương của nhân viên này để cập nhật' });
    }
    
    res.status(200).json({ message: 'Cập nhật thông tin lương thành công' });
  } catch (error) {
    console.error("Error updating salary info:", error.message);
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin lương', error: error.message });
  }
};



// Xóa thông tin lương theo ID
export const deleteSalaryInfo = async (req, res) => {
  const { salary_info_id } = req.params;
  try {
    const queryResult = await db.query('DELETE FROM salary_info WHERE salary_info_id = ?', [salary_info_id]);
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin lương để xóa' });
    }
    res.status(200).json({ message: 'Xóa thông tin lương thành công' });
  } catch (error) {
    console.error("Error deleting salary info:", error.message);
    res.status(500).json({ message: 'Lỗi khi xóa thông tin lương', error: error.message });
  }
};
