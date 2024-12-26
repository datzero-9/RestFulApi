
const Product = require('../../models/crud')
const ListImages = require('../../models/list_images');


const edit = async (req, res) => {
    try {
        const idProduct = req.params.id;

        // Lấy thông tin sản phẩm
        const product = await Product.findById(idProduct);
        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }

        // Lấy danh sách hình ảnh liên quan đến sản phẩm
        const listImages = await ListImages.find({ idProduct });

        res.status(200).json([product, listImages]);
    } catch (error) {
        console.error('Error fetching product or images:', error);
        res.status(500).send('Internal Server Error');
    }
};
//PUT
const updateCourse = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('PUT : /api/updateProduct');
    console.log('--------------------');
    console.log(req.body)
    try {
        const Products = await Product.findById(req.params.id)
        Products.name = req.body.name;
        Products.price = req.body.price;
        Products.discount = req.body.discount;
        Products.warehouse = req.body.warehouse;
        Products.realPrice = req.body.realPrice;
        Products.description = req.body.description;
        Products.category = req.body.category;
        Products.image = req.body.image;
        await Products.save()
        res.status(200).json('Thay đổi thành công');
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { updateCourse, edit };
