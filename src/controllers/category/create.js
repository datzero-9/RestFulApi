const Category = require('../../models/category')
const createCategory = async (req, res) => {
    console.log('POST : /api/createCategory');
    console.log('--------------------');
    try {
        const newCategory = Category({
            name: req.body.name.trim()
        })
        await newCategory.save()
        res.status(200).json('Tạo thành công');
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
module.exports = createCategory;