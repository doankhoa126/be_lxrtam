export const onlyOwner = (req, res, next) => {

    const role_id = req.user.roles?.[0]?.role_id; 
    if (role_id!== 1) {
        return res.status(403).json({ error: 'Only the owner has this right' });
    }
    next(); // Tiếp tục nếu là owner
};

export const ownerOrAdmin = (req, res, next) => {
    const role_id = req.user.roles?.[0]?.role_id;

    // Kiểm tra nếu role_id không phải là 1 (owner) hoặc 2 (admin), trả về lỗi
    if (![1, 2].includes(role_id)) {
        return res.status(403).json({ error: 'Only the owner or admin has this right' });
    }

    next(); // Tiếp tục nếu là owner hoặc admin
};
