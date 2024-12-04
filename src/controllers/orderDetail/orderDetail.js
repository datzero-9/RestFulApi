const OrderDetail = require('../../models/order_detail');
const Product = require('../../models/crud');
const getOrderDetail = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : /api/orderDetail');
    console.log('--------------------');
    try {
        // Tìm các OrderDetail theo idOrder
        const orderDetails = await OrderDetail.find({ idOrder: req.body.id }).sort({ createdAt: -1 });
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).send('Lỗi');
    }
};
module.exports = { getOrderDetail };