const Order = require('../../models/order')
const Account = require('../../models/accounts')
const OrderDetail = require('../../models/order_detail')
const { getCart, createCart, deleteCart, deleteAllCart } = require('../Cart/Cart')
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const Product = require('../../models/crud')
// const  backend = 'https://restfulapi-aci6.onrender.com/api';
const  ngrok = 'https://068b-116-110-217-24.ngrok-free.app/api'; //đẻ zalopay gọi đến backend callback
// const  backend = 'http://localhost:80/api';
const  backend = 'https://restfulapi-aci6.onrender.com/api';
const  frontend = ' https://6aef-116-110-218-125.ngrok-free.app';
const webhook = 'https://n8n.laptrinhmang3.xyz';

const Checkout = async (req, res) => {
    try {
        
        const idUser = req.body.idUser;
        const address = req.body.address;
        const phone = req.body.phone;
        const note = req.body.note;
        const state = req.body.state;
        const total = req.body.total;
        const payment = req.body.payment;
        const listCart = req.body.listCart;
        const user = await Account.findOne({ _id:idUser });
        const email = user.username;
        console.log(email)
        const newOrder = await Order.create({
            idUser,
            email,
            address,
            phone,
            note,
            state,
            total,
            payment
        });
        // Lấy ID của đơn hàng vừa tạo
        const orderId = newOrder._id;

        const orderDetails = [];
        for (const cartItem of listCart) {
            const { idProduct, quantity } = cartItem;

            const product = await Product.findById(idProduct);

            if (!product) {
                return res.status(404).json({ message: `Sản phẩm với ID ${idProduct} không tồn tại` });
            }

            if (product.warehouse < quantity) {
                return res.status(400).json({
                    message: `Sản phẩm "${product.name}" không đủ hàng. Hiện tại còn ${product.stock} sản phẩm.`,
                });
            }

            product.warehouse -= quantity;
            await product.save();

            orderDetails.push({
                idOrder: orderId,
                idProduct,
                name: product.name,
                quantity,
                realPrice: product.realPrice,
                image: product.image,
            });
        }

        //webhook
        axios.post(`${webhook}/webhook/comfirm-order`, {})
            .then((res) => {
                console.log('gọi đến webhook thành công')
            })
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


// APP INFO
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const Payment = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);

    const embed_data = {
        redirecturl: `${frontend}/user/histories`
    }
    const items = [req.body];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, 
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: req.body.total,
        description: `LSHOP-TECH - Thanh toán cho đơn hàng #${transID}`,
        bank_code: "",
        // callback_url: `${backend}/callback`
        callback_url: `${ngrok}/callback`

    };

    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    // console.log(order)
    try {
        const result = await axios.post(config.endpoint, null, { params: order })
        return res.status(200).json(result.data)
    } catch (error) {
        console.log(error)
    }


}
const Callback = async (req, res) => {
    let result = {};
    console.log('vô dc đây rồi haha')
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
            console.log('chưa thanh toán')
        }
        else {
            // thanh toán thành công
            let dataJson = JSON.parse(dataStr, config.key2);
            const parsedData = JSON.parse(dataJson.item);
            console.log(parsedData)
            const checkout = {
                idUser: parsedData[0].idUser,
                address: parsedData[0].address,
                phone: parsedData[0].phone,
                note: parsedData[0].note,
                state: true,
                total: parsedData[0].total,
                payment: parsedData[0].payment,
                listCart: parsedData[0].listCart,
            }

            try {
                axios.post(`${backend}/checkout`, checkout)
                    .then((res) => {
                        try {
                            axios.delete(`${backend}/deleteAllCart/${checkout.idUser}`)
                                .then((res) => {
                                    console.log(res.data)
                                })
                        } catch (error) {
                            console.log('có lỗi xảy ra, vui lòng kiểm tra lại')
                        }
                    })
            } catch (error) {
                console.log('Có lỗi xảy ra: ' + error)
            }
            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    return res.json(result);

}
module.exports = { Checkout, updateState, Payment, Callback };
