
const Product = require('../../models/crud')

const getHomepage = async (req, res) => {
    try {
        const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
        console.log(`Client IP: ${clientIp}`);
        console.log('GET : /api/getAllProduct');
        console.log('--------------------');
        const user = req.session.user;
        const Products = await Product.find().sort({ createdAt: -1 }).lean();
        res.status(200).json(Products);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
const getItem = async (req, res) => {
    try {
        const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
        console.log(`Client IP: ${clientIp}`);
        console.log('GET : /api/detailProduct');
        console.log('--------------------');
        const productId = req.body.id; // Đảm bảo bạn gửi ID qua query parameter productId
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.json(product);
    } catch (error) {
        console.error('Lỗi khi truy vấn sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
};
const listProductCategory = async (req, res) => {
    try {
        const Products = await Product.find({category:req.params.name}).sort({ createdAt: -1 });
        res.status(200).json(Products);
        console.log(req.params.name)
    } catch (error) {
        console.error('Lỗi khi truy vấn sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
}

module.exports = { getItem, getHomepage, listProductCategory };
