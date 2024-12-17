const Category = require('../../models/category')

const getItemCategory = async (req, res) => {
    try {
        console.log(req.body.id)
        const itemCategory = await Category.findById(req.body.id).lean()
        res.status(200).json(itemCategory)
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
//PUT
const updateCategory = async (req, res) => {
    console.log('PUT : /api/updateCategory');
    console.log('--------------------');
    try {
        const itemCategory = await Category.findById(req.params.id)
        itemCategory.name = req.body.name.trim();
        await itemCategory.save()
        res.status(200).json('Thay đổi thành công danh mục')
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { updateCategory, getItemCategory };