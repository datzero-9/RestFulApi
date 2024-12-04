const Product = require('../../models/crud')

const addProduct = async (req, res) => {
    const user = req.session.user;

    res.render('create', { user })
}

const Create = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : /api/createProduct');
    console.log('--------------------');
    try {
        console.log(req.body)
       
        const newProduct = new Product(req.body);
        await newProduct.save(); 
        res.status(200).json('Sản phẩm đã được thêm vào danh sách');
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}

module.exports = { Create, addProduct };
