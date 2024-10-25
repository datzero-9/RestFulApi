
const Product = require('../../models/crud')


const edit = async (req, res) => {
    try {
        const user = req.session.user;
        const idProduct = req.params.id;
        const Products = await Product.findById(idProduct).lean();
        // res.render('update', { Products });
        console.log('Request : GET : Lấy thông tin sản phẩm')
        console.log('--------------------');
        res.status(200).json(Products)
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
//PUT
const updateCourse = async (req, res) => {
    try {
        const user = req.session.user;
        const Products = await Product.findById(req.params.id)
        Products.name = req.body.name;
        Products.price = req.body.price;
        Products.description = req.body.description;
        Products.category = req.body.category;
        Products.image = req.body.image;
        await Products.save()
        res.status(200).json('Thay đổi thành công');
        console.log('Sản phẩm Đã được thay đổi')
        console.log('--------------------');
        // res.redirect('/admin');
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { updateCourse, edit };
