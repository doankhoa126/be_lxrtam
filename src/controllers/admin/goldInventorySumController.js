import db from "../../config/db.js";

export const getAllSummary = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM gold_inventory_summary ORDER BY date_manage DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addSummary = async (req, res) => {
    const {
        date_manage,
        item_category,
        opening_inventory,
        gold_produced,
        process_variation,
        closing_inventory,
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO gold_inventory_summary 
            (date_manage, item_category, opening_inventory, gold_produced, process_variation, closing_inventory) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [date_manage, item_category, opening_inventory, gold_produced, process_variation, closing_inventory]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSummary = async (req, res) => {
    const { id } = req.params;
    const {
        date_manage,
        item_category,
        opening_inventory,
        gold_produced,
        process_variation,
        closing_inventory,
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE gold_inventory_summary 
            SET date_manage = $1, item_category = $2, opening_inventory = $3, gold_produced = $4, 
                process_variation = $5, closing_inventory = $6, modified_at = NOW()
            WHERE id = $7 RETURNING *`,
            [date_manage, item_category, opening_inventory, gold_produced, process_variation, closing_inventory, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSummary = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM gold_inventory_summary WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTotalWeightByDateAndGold = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                NgayLenDon AS date_manage,
                MaVang AS ma_vang,
                SUM(TrongLuongTheoCongThucCan) AS total_weight
            FROM 
                gold_inventory_management
            GROUP BY 
                NgayLenDon, MaVang
            ORDER BY 
                NgayLenDon, MaVang
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProcessVariationByDateAndGold = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                NgayLenDon AS date_manage,
                MaVang AS ma_vang,
                SUM(TrongLuongTyThuVao) AS process_variation
            FROM 
                gold_inventory_management
            GROUP BY 
                NgayLenDon, MaVang
            ORDER BY 
                NgayLenDon, MaVang
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
