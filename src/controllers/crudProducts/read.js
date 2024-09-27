
const Product = require('../../models/crud')

const getHomepage = async (req, res) => {
    try {
        const Products = await Product.find().lean();
        res.render('home', { Products });
        // res.json(courses)
       
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}

module.exports = getHomepage;
