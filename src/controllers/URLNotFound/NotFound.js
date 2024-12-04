const NotFound = async (req, res) => {
    try {
        const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
        console.log(`Client IP: ${clientIp}`);
        console.log('Thao tác sai lỗi 404 Not found :  điều hướng đến khắc phục')
        res.json('https://bizfly.vn/techblog/loi-404-not-found-la-gi-nguyen-nhan-va-cach-khac-phuc-sua-loi-hieu-qua.html#techblog_.main_content_blog_Detail_text-1')
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = NotFound;