const Product = require('../../models/crud')


const deleteCourse = async (req, res) => {
    try {
        console.log('User: Request Delete')
        // Loại bỏ khoảng trắng cuối cùng trong chuỗi ID
        const courseId = req.params.id;
        const deletedCourse = await Product.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).send('Không tìm thấy khóa học để xóa.');
        }

        res.redirect('/admin');
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = deleteCourse;
