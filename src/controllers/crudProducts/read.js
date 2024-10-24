
const Product = require('../../models/crud')

const getHomepage = async (req, res) => {
    try {

        const user = req.session.user;
        const Products = await Product.find().lean();
        res.render('home', { Products, user });
        //res.status(200).json(Products);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
const getItem = async (req, res) => {
    try {

        const productId = req.body.id; // Đảm bảo bạn gửi ID qua query parameter productId
        console.log('User: GET product')
        console.log('--------------------');
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

module.exports = { getItem, getHomepage };
