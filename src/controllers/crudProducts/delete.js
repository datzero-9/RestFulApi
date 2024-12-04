const Product = require('../../models/crud')


const deleteProduct = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('DELETE : /api/deleteProduct');
    console.log('--------------------');
    try {
        // Loại bỏ khoảng trắng cuối cùng trong chuỗi ID
        const courseId = req.params.id;
        const deletedCourse = await Product.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).send('Không tìm thấy khóa học để xóa.');
        }

        res.status(200).json('Xóa thành công');
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = deleteProduct;
