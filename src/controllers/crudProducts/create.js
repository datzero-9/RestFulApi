const Product = require('../../models/crud')



const addProduct = async (req, res) => {
    const user = req.session.user;

    res.render('create', { user })
}

const Create = async (req, res) => {
    try {
        console.log(req.body)
        const newProduct = new Product(req.body);
        await newProduct.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
        res.redirect('/admin')
        console.log('1 sản phẩm mới đã được thêm');
        console.log('--------------------');
        // res.status(200).json('Sản phẩm đã được thêm vào danh sách');
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}

module.exports = { Create, addProduct };
