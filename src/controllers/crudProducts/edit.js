
const Product = require('../../models/crud')


const edit = async (req, res) => {
    try {
        const user = req.session.user;
        const idProduct = req.params.id;
        const Products = await Product.findById(idProduct).lean();
        res.status(200).json(Products)
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
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
