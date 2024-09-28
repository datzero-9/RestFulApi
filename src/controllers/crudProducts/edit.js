
const Product = require('../../models/crud')


const edit = async (req, res) => {
    try {
        const Products = await Product.findById(req.params.id).lean();
        res.render('update', { Products });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
//PUT
const updateCourse = async (req, res) => {
    try {

        const Products = await Product.findById(req.params.id)
        Products.name = req.body.name;
        Products.price = req.body.price;
        Products.description = req.body.description;
        await Products.save()
        res.redirect('/admin');
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {updateCourse, edit};
