const Comment = require('../../models/comment')
const getComment = async (req, res) => {
    try {
        const Comments = await Comment.find({ idProduct: req.body.id }).sort({ createdAt: -1 });
        res.status(200).json(Comments); // gửi phản hồi lại client
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Lỗi');
    }
}
const createComment = async (req, res) => { 
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);         
    console.log('POST : /api/coment');
    console.log('--------------------');
    try {
        console.log(req.body)
        const newComment = new Comment(req.body);
        await newComment.save(); 
        res.status(200).json('Bình luận mới đã được thêm vào');
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}
// const deleteCart = async (req, res) => {
//     try {


//         const idCart = req.params.id;
//         console.log(idCart)
//         const deletedCart = await Cart.findByIdAndDelete(idCart);

//         if (!deletedCart) {
//             return res.status(404).send('Không tìm thấy khóa học để xóa.');
//         }
//         console.log('Người dùng đã xóa sản phẩm khỏi cart')
//         console.log('--------------------');
//         res.status(200).json('Xóa thành công');
//         // res.redirect('/admin');
//     } catch (error) {
//         console.error('Lỗi khi xóa khóa học:', error);
//         res.status(500).send('Lỗi máy chủ nội bộ');
//     }
// };

// const deleteAllCart = async (req, res) => {
//     try {
//         const idUser = req.params.id; // Lấy idUser từ URL hoặc từ req.body nếu cần
//         console.log(idUser)
//         const deleteCart = await Cart.deleteMany({ idUser });

//         if (deleteCart.deletedCount === 0) {
//             return res.status(404).send('Không có danh mục nào để xóa cho người dùng này.');
//         }

//         console.log(`Người dùng ${idUser} đã xóa tất cả danh mục của mình.`);
//         console.log('--------------------');
//         res.status(200).json('Xóa tất cả danh mục thành công');
//     } catch (error) {
//         console.error('Lỗi khi xóa danh mục:', error);
//         res.status(500).send('Lỗi máy chủ nội bộ');
//     }
// };
module.exports = { createComment, getComment };