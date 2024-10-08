const Product = require('../../models/crud')

const getItemSearch = async (req, res) => {
    const productName = req.body.text;

    try {
        if (productName) {
            // Loại bỏ các ký tự đặc biệt và tạo regex
            const sanitizedProductName = productName.replace(/[^a-zA-Z0-9\s]/g, ''); // Giữ lại chữ cái, số và khoảng trắng
            const regex = new RegExp(escapeRegex(sanitizedProductName), 'i'); // 'i' để không phân biệt chữ hoa chữ thường
            const products = await Product.find({
                name: { $regex: regex }
            });

            res.json(products);
        } else {
            const products = [];
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
} 

module.exports = getItemSearch;