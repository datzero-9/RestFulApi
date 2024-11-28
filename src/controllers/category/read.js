const Category = require('../../models/category')
const getCategory = async (req, res) => {
    // console.log('GET : /api/getCategory');
    // console.log('--------------------');
    try {
        const Categorys = await Category.find();
        res.status(200).json(Categorys)
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
module.exports = getCategory;