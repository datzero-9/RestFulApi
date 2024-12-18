
const Product = require('../../models/crud')

const getHomepage = async (req, res) => {
    try {
        let filter = {};  // Tạo đối tượng filter để chứa các điều kiện lọc

        // Kiểm tra điều kiện lọc theo giá (mảng price)
        if (req.body.price && req.body.price.length > 0) {
            // Lọc các khoảng giá đã chọn
            const priceFilters = [];

            if (req.body.price.includes(1)) {
                priceFilters.push({ realPrice: { $lte: 1000000 } }); // Lọc giá dưới 500.000
            }
            if (req.body.price.includes(2)) {
                priceFilters.push({ realPrice: { $gte: 1000000, $lte: 2000000 } }); // Lọc giá từ 500.000 đến 1.000.000
            }
            if (req.body.price.includes(3)) {
                priceFilters.push({ realPrice: { $gte: 2000000, $lte: 3000000 } }); // Lọc giá từ 1.000.000 đến 2.000.000
            }
            if (req.body.price.includes(4)) {
                priceFilters.push({ realPrice: { $gte: 3000000, $lte: 4000000 } }); // Lọc giá từ 2.000.000 đến 3.000.000
            }
            if (req.body.price.includes(5)) {
                priceFilters.push({ realPrice: { $gte: 4000000 } }); // Lọc giá trên 3.000.000
            }

            // Nếu có các khoảng giá, thêm vào bộ lọc
            if (priceFilters.length > 0) {
                filter.$or = priceFilters; // Dùng $or để kết hợp các khoảng giá
            }
        }
        // Kiểm tra điều kiện lọc theo danh mục
        if (req.body.category && req.body.category.length > 0) {
            filter.category = { $in: req.body.category };  // Lọc theo danh mục được chọn
        }
        // Truy vấn sản phẩm với các bộ lọc
        const Products = await Product.find(filter).sort({ createdAt: -1 });

        // Trả về kết quả
        res.status(200).json(Products);
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Lỗi');
    }
};

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
        const Products = await Product.find({ category: req.params.name }).sort({ createdAt: -1 });
        res.status(200).json(Products);
        // console.log(req.params.name)
    } catch (error) {
        console.error('Lỗi khi truy vấn sản phẩm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
}

module.exports = { getItem, getHomepage, listProductCategory };
