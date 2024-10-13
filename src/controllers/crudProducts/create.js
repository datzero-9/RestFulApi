const Product = require('../../models/crud')



const addProduct = async (req, res) => {
    res.render('create')
}

const Create = async (req, res) => {
    try {
        const newCourse = new Product({
            name: req.body.name, // Giả sử thông tin sản phẩm được gửi qua body request
            category: 'Điện thoại', // Giả sử thông tin sản phẩm được gửi qua body request
            price: req.body.price, // Giả sử thông tin sản phẩm được gửi qua body request
            description: req.body.description,
            image: 'https://i.ytimg.com/vi/z2f7RHgvddc/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCML-byK5TPhWN_-ZuZal4h5KasYw',
            // slug: req.body.name + 'xyx'
        });
        await newCourse.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
        res.redirect('/admin')
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}

module.exports = { Create, addProduct };
