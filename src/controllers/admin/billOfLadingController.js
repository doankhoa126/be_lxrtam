import db from "../../config/db.js";

// 1. Lấy tất cả dữ liệu vận đơn
export const getAllBillOfLadings = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM gold_casting_manage");

    if (!Array.isArray(rows)) {
      return res.status(500).json({ error: "Data is not iterable" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching bill of ladings: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 2. Lấy dữ liệu vận đơn theo khoảng thời gian
export const getBillOfLadingsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const query = `
      SELECT * FROM gold_casting_manage
      WHERE ngay_dieu_phoi BETWEEN $1 AND $2
    `;
    const values = [startDate || "1900-01-01", endDate || "2100-12-31"];
    const { rows } = await db.query(query, values);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching bill of ladings by date range: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 3. Lọc dữ liệu vận đơn theo ngày cụ thể
export const getBillOfLadingsByDate = async (req, res) => {
  const { date } = req.query;

  try {
    if (!date) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp ngày để lọc!" });
    }

    const query = `
      SELECT * 
      FROM gold_casting_manage
      WHERE ngay_dieu_phoi = $1
    `;
    const { rows } = await db.query(query, [date]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu cho ngày này!" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error filtering bill of ladings by date: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 4. Lấy dữ liệu vận đơn theo ID
export const getBillOfLadingById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT * FROM gold_casting_manage
      WHERE id = $1
    `;
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi!" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching bill of lading by ID: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 5. Cập nhật dữ liệu vận đơn
export const updateBillOfLading = async (req, res) => {
  const { id } = req.params;
  const { trongLuong } = req.body;

  try {
    const checkQuery = `
      SELECT ngay_dieu_phoi, so_lap, ma_van_don, phan_loai, tuoi_vang, ma_san_pham
      FROM gold_casting_manage
      WHERE id = $1
    `;
    const { rows } = await db.query(checkQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi!" });
    }

    const record = rows[0];
    if (
      !record.ngay_dieu_phoi ||
      !record.so_lap ||
      !record.ma_van_don ||
      !record.phan_loai ||
      !record.tuoi_vang ||
      !record.ma_san_pham
    ) {
      return res.status(400).json({
        message: "Cần có dữ liệu đầy đủ ở các cột trước khi cập nhật!",
      });
    }

    const updateQuery = `
      UPDATE gold_casting_manage
      SET trong_luong_phoi_sau_khi_cat_ty = COALESCE($1, trong_luong_phoi_sau_khi_cat_ty),
          modified_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
    const values = [trongLuong, id];
    const updateResult = await db.query(updateQuery, values);

    res.json({ message: "Cập nhật thành công!", note: updateResult.rows[0] });
  } catch (err) {
    console.error("Error updating bill of lading: ", err);
    res.status(500).json({ error: err.message });
  }
};

// 6. Kiểm tra giá trị vận đơn
export const checkBillOfLadingValue = async (req, res) => {
  const { maSanPham, trongLuong } = req.body;

  try {
    const query = `
      SELECT * FROM gold_casting_manage
      WHERE ma_san_pham = $1
    `;
    const { rows } = await db.query(query, [maSanPham]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Mã sản phẩm không tồn tại!" });
    }

    const note = rows[0];
    if (
      parseFloat(note.trong_luong_phoi_sau_khi_cat_ty) ===
      parseFloat(trongLuong)
    ) {
      res.json({ message: "Giá trị hợp lệ!" });
    } else {
      res.json({
        message: "Giá trị không khớp!",
        expected: note.trong_luong_phoi_sau_khi_cat_ty,
      });
    }
  } catch (err) {
    console.error("Error checking bill of lading value: ", err);
    res.status(500).json({ error: err.message });
  }
};
