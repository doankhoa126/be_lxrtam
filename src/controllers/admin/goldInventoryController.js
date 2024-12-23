// goldInventoryController.js
import db from "../../config/db.js";

// Create a new record
export const createGoldInventory = async (req, res) => {
    try {
        const {
            NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
            TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
            GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
            NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
            DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
            TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
            NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
            TrongLuongVangGiamDiSauKhiCatTi
        } = req.body;

        const query = `INSERT INTO gold_inventory_management (
            NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
            TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
            GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
            NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
            DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
            TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
            NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
            TrongLuongVangGiamDiSauKhiCatTi
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
            TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
            GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
            NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
            DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
            TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
            NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
            TrongLuongVangGiamDiSauKhiCatTi
        ];

        await db.query(query, values);
        res.status(201).json({ message: 'Record created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create record' });
    }
};

// View a record
export const getGoldInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM gold_inventory_management WHERE ID = ?';
        const [rows] = await db.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch record' });
    }
};

// Update a record
export const updateGoldInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
            TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
            GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
            NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
            DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
            TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
            NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
            TrongLuongVangGiamDiSauKhiCatTi
        } = req.body;

        const query = `UPDATE gold_inventory_management SET 
            NgayLenDon = ?, NguoiYeuCau = ?, NgayHoanThanh = ?, SoGio = ?, MaVanDon = ?, LuongHang = ?,
            TrangThaiDon = ?, NguoiPhuTrach = ?, MaSanPham = ?, MaVang = ?, MaLap = ?, TrongLuongThanhPham = ?,
            GiacMocPhuKien = ?, TrongLuongPhoi = ?, NgayTiepNhanDon = ?, HanGiaoInfo = ?, To3D = ?, NguoiPhuTrach3D = ?,
            NgayCanLap = ?, TrongLuongVang24k = ?, TrongLuongHoi = ?, TrongLuongVangCu = ?, TrongLuongTheoCongThucCan = ?,
            DoLechCanChoPhep = ?, TongTrongLuongSauKhiCongLechCanChoPhep = ?, NguoiPhuTrachCan = ?, NgayDuc = ?,
            TrongLuongSauKhiDuc = ?, ChenhLechSauKhiDuc = ?, NguoiPhuTrachDuc = ?, NgayXuatCatTiThanhPhoiSanPham = ?,
            NguoiPhuTrachCatTy = ?, ThuTuCatPhoiTrongNgay = ?, TongTrongLuongPhoiCat = ?, TrongLuongTyThuVao = ?,
            TrongLuongVangGiamDiSauKhiCatTi = ?, modified_at = CURRENT_TIMESTAMP
        WHERE ID = ?`;

        const values = [
            NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
            TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
            GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
            NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
            DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
            TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
            NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
            TrongLuongVangGiamDiSauKhiCatTi, id
        ];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found or no changes made' });
        }

        res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update record' });
    }
};
