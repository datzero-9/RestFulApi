const Category = require('../../models/category')
const deleteCategory = async (req, res) => {
    const temp = req.params.id;
    console.log('DELETE : /api/deleteCategory');
    console.log('--------------------');
    try {
        const deleteSuccess = await Category.findByIdAndDelete(temp)
        if(deleteSuccess){
            res.status(200).json('Xóa thành công')
        }else{
            res.status(500).json('Xóa không thành công')  
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
module.exports = deleteCategory;