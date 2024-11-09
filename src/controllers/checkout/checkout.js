const Order = require('../../models/order')
const OrderDetail = require('../../models/order_detail')
const { getCart, createCart, deleteCart, deleteAllCart } = require('../Cart/Cart')
const Checkout = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const address = req.body.address;
        const phone = req.body.phone;
        const note = req.body.note;
        const state = req.body.state;
        const total = req.body.total;
        const listCart = req.body.listCart;

        // Tạo một đơn hàng mới
        const newOrder = await Order.create({
            idUser,
            address,
            phone,
            note,
            state,
            total
        });

        // Lấy ID của đơn hàng vừa tạo
        const orderId = newOrder._id;
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
const updateState = async (req, res) => {
    try {
        const itemOrder = await Order.findById(req.body.idOrder)
        itemOrder.state = req.body.state;
        await itemOrder.save()
        res.status(200).json('Xác nhận thành công')
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {Checkout,updateState};