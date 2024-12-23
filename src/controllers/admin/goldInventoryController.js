import db from "../../config/db.js";
import moment from 'moment';

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

        const query = `
            INSERT INTO gold_inventory_management (
                NgayLenDon, NguoiYeuCau, NgayHoanThanh, SoGio, MaVanDon, LuongHang,
                TrangThaiDon, NguoiPhuTrach, MaSanPham, MaVang, MaLap, TrongLuongThanhPham,
                GiacMocPhuKien, TrongLuongPhoi, NgayTiepNhanDon, HanGiaoInfo, To3D, NguoiPhuTrach3D,
                NgayCanLap, TrongLuongVang24k, TrongLuongHoi, TrongLuongVangCu, TrongLuongTheoCongThucCan,
                DoLechCanChoPhep, TongTrongLuongSauKhiCongLechCanChoPhep, NguoiPhuTrachCan, NgayDuc,
                TrongLuongSauKhiDuc, ChenhLechSauKhiDuc, NguoiPhuTrachDuc, NgayXuatCatTiThanhPhoiSanPham,
                NguoiPhuTrachCatTy, ThuTuCatPhoiTrongNgay, TongTrongLuongPhoiCat, TrongLuongTyThuVao,
                TrongLuongVangGiamDiSauKhiCatTi
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36
            )
        `;

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
        const query = 'SELECT * FROM gold_inventory_management WHERE ID = $1';
        const { rows } = await db.query(query, [id]);

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

        const query = `
            UPDATE gold_inventory_management SET 
                NgayLenDon = $1, NguoiYeuCau = $2, NgayHoanThanh = $3, SoGio = $4, MaVanDon = $5, LuongHang = $6,
                TrangThaiDon = $7, NguoiPhuTrach = $8, MaSanPham = $9, MaVang = $10, MaLap = $11, TrongLuongThanhPham = $12,
                GiacMocPhuKien = $13, TrongLuongPhoi = $14, NgayTiepNhanDon = $15, HanGiaoInfo = $16, To3D = $17, NguoiPhuTrach3D = $18,
                NgayCanLap = $19, TrongLuongVang24k = $20, TrongLuongHoi = $21, TrongLuongVangCu = $22, TrongLuongTheoCongThucCan = $23,
                DoLechCanChoPhep = $24, TongTrongLuongSauKhiCongLechCanChoPhep = $25, NguoiPhuTrachCan = $26, NgayDuc = $27,
                TrongLuongSauKhiDuc = $28, ChenhLechSauKhiDuc = $29, NguoiPhuTrachDuc = $30, NgayXuatCatTiThanhPhoiSanPham = $31,
                NguoiPhuTrachCatTy = $32, ThuTuCatPhoiTrongNgay = $33, TongTrongLuongPhoiCat = $34, TrongLuongTyThuVao = $35,
                TrongLuongVangGiamDiSauKhiCatTi = $36, modified_at = CURRENT_TIMESTAMP
            WHERE ID = $37
        `;

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

        const { rowCount } = await db.query(query, values);

        if (rowCount === 0) {
            return res.status(404).json({ message: 'Record not found or no changes made' });
        }

        res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update record' });
    }
};

export const getUnfinishedOrders = async (req, res) => {
    try {
        const query = "SELECT * FROM gold_inventory_management WHERE TrangThaiDon = 'Chưa hoàn thành'";
        const result = await db.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No unfinished orders found.',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching unfinished orders:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching data.',
        });
    }
};

