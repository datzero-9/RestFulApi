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

module.exports = { createComment, getComment };