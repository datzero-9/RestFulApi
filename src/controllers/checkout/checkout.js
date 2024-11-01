const Order = require('../../models/order')
const OrderDetail = require('../../models/order_detail')
const { getCart, createCart, deleteCart, deleteAllCart } = require('../Cart/Cart')
const Checkout = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const address = req.body.address;
        const phone = req.body.phone;
        const note = req.body.note;
        const listCart = req.body.listCart;
        console.log(listCart)
        // Tạo một đơn hàng mới
        const newOrder = await Order.create({
            idUser,
            address,
            phone,
            note
        });

        // Lấy ID của đơn hàng vừa tạo
        const orderId = newOrder._id;
        console.log(orderId)

        // Tạo các bản ghi chi tiết đơn hàng cho từng sản phẩm
        const orderDetails = listCart.map(listCart => ({
            idOrder: orderId,
            idProduct: listCart.idProduct,
            quantity: listCart.quantity,
            price: listCart.price,
            image: listCart.image // Giả sử `product` chứa các thông tin như productId, quantity, price, v.v.
        }));

        // Lưu tất cả chi tiết đơn hàng cùng lúc
        await OrderDetail.insertMany(orderDetails);
    
        res.status(201).json({ message: 'Checkout thành công', orderId });
    } catch (error) {
        console.error('Lỗi trong quá trình checkout:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}
module.exports = Checkout;