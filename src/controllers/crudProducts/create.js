const Product = require('../../models/crud');
const ListImages = require('../../models/list_images');

const addProduct = async (req, res) => {
    const user = req.session.user;
    res.render('create', { user });
};

const Create = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : /api/createProduct');
    console.log('--------------------');
    try {

        // Tạo sản phẩm
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        if (req.body.images && req.body.images.length > 0) {
            req.body.images.forEach(async (image) => {
                const newImage = new ListImages({
                    idProduct: savedProduct._id, 
                    image: image, 
                });
                await newImage.save(); 
            });
        }

        res.status(200).json('Sản phẩm đã được thêm vào danh sách');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
};

module.exports = { Create, addProduct };
