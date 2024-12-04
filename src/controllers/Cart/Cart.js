const Cart = require('../../models/cart')
const getCart = async (req, res) => {
    console.log('GET : /api/getCart');
    console.log('--------------------');
    try {
        const Carts = await Cart.find(req.body).sort({ createdAt: -1 });
        res.status(200).json(Carts);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
const createCart = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : /api/createCart');
    console.log('--------------------');
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct
        const existingCart = await Cart.findOne({ idUser, idProduct });
        if (existingCart) {
            return res.json({ message: 'Sản phẩm này đã có trong giỏ hàng', status: false });
        } else {
            const newCart = new Cart(req.body);
            await newCart.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
            res.status(200).json({ message: 'Sản phẩm này đã có trong giỏ hàng', status: true });;
        }

    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}
const deleteCart = async (req, res) => {
    console.log('DELETE : /api/deleteCart');
    console.log('--------------------');
    try {
        const idCart = req.params.id;
        console.log(idCart)
        const deletedCart = await Cart.findByIdAndDelete(idCart);

        if (!deletedCart) {
            return res.status(404).send('Không tìm thấy khóa học để xóa.');
        }
        res.status(200).json('Xóa thành công');
        // res.redirect('/admin');
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

const deleteAllCart = async (req, res) => {
    try {
        const idUser = req.params.id; // Lấy idUser từ URL hoặc từ req.body nếu cần
        const deleteCart = await Cart.deleteMany({ idUser });
        if (deleteCart.deletedCount === 0) {
            return res.status(404).send('Không có danh mục nào để xóa cho người dùng này.');
        }
        console.log('DELETE: /api/deleteAllCart');
        console.log('--------------------');
        res.status(200).json('Xóa tất cả danh mục thành công');
    } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = { getCart, createCart, deleteCart, deleteAllCart };