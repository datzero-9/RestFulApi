const Product = require('../../models/crud');

const getItemSearch = async (req, res) => {
    const productName = req.body.text?.trim(); // Loại bỏ khoảng trắng thừa

    console.log("Tìm kiếm sản phẩm:", productName);

    try {
        if (productName.length > 0) {
            // Tạo regex để tìm kiếm không phân biệt chữ hoa/chữ thường
            const regex = new RegExp(productName, 'i'); // 'i' để không phân biệt hoa/thường
            const products = await Product.find({ name: { $regex: regex } });
            res.json(products); // Trả về kết quả tìm thấy
        } else {
            const regex = new RegExp(productName, 'i'); // 'i' để không phân biệt hoa/thường
            const products = await Product.find({ name: { $regex: regex } });
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
};

module.exports = getItemSearch;
