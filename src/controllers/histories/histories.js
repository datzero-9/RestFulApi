const Order = require('../../models/order');

const getHistories = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : api/getHistories');
    console.log('--------------------');
    try {
        const id = req.body.id; // Lấy id user từ req.body
        // Tìm các đơn hàng theo iduser và sắp xếp theo ngày tạo mới nhất
        const orders = await Order.find({ idUser: id }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).send('Lỗi');
    }
};

const getAllHistories = async (req, res) => {
    try {
        const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
        console.log('GET : api/getAllHistories');
        console.log('--------------------');
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).send('Lỗi');
    }
};
module.exports = { getHistories, getAllHistories };