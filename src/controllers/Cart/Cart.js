const Cart = require('../../models/cart')
const getCart = async (req, res) => {
    try {

        const Carts = await Cart.find(req.body).sort({ createdAt: -1 });
        res.status(200).json(Carts);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Lỗi');
    }
}
const createCart = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct
        const existingCart = await Cart.findOne({ idUser, idProduct });
        if (existingCart) {
            return res.json({ message: 'Sản phẩm này đã có trong giỏ hàng', status: false });
        } else {
            const newCart = new Cart(req.body);
            await newCart.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
            console.log('Khách hàng đã thêm sản phẩm vào giỏ hàng');
            console.log('--------------------');
            res.status(200).json({ message: 'Sản phẩm này đã có trong giỏ hàng', status: true });;
        }

    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}
const deleteCart = async (req, res) => {
    try {


        const idCart = req.params.id;
        console.log(idCart)
        const deletedCart = await Cart.findByIdAndDelete(idCart);

        if (!deletedCart) {
            return res.status(404).send('Không tìm thấy khóa học để xóa.');
        }
        console.log('Người dùng đã xóa sản phẩm khỏi cart')
        console.log('--------------------');
        res.status(200).json('Xóa thành công');
        // res.redirect('/admin');
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

const deleteAllCart = async (req, res) => {
    try {
        const deletedCart = await Cart.deleteMany({}); // Xóa toàn bộ sản phẩm trong Cart

        if (deletedCart.deletedCount === 0) {
            return res.status(404).send('Không có sản phẩm nào để xóa.');
        }

        console.log('Người dùng đã xóa tất cả sản phẩm khỏi cart');
        console.log('--------------------');
        res.status(200).json('Xóa tất cả sản phẩm thành công');
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = { getCart, createCart, deleteCart };