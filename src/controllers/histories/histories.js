const Order = require('../../models/order');

const getHistories = async (req, res) => {
    try {
        const  id  = req.body.id; // Lấy id user từ req.body
        // Tìm các đơn hàng theo iduser và sắp xếp theo ngày tạo mới nhất
        const orders = await Order.find({ idUser: id }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).send('Lỗi');
    }
};
module.exports = getHistories;