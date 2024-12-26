const Product = require('../../models/crud');
const ListImages = require('../../models/list_images');

const deleteProduct = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('DELETE : /api/deleteProduct');
    console.log('--------------------');

    try {
        const productId = req.params.id;

        // Xóa sản phẩm
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send('Không tìm thấy sản phẩm để xóa.');
        }

        // Xóa tất cả hình ảnh liên quan đến sản phẩm
        const deletedImages = await ListImages.deleteMany({ idProduct: productId });
        console.log(`Deleted ${deletedImages.deletedCount} images related to product ${productId}`);

        res.status(200).json('Xóa sản phẩm và hình ảnh thành công');
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

module.exports = deleteProduct;
