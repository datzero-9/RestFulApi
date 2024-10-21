const NotFound = async (req, res) => {
    try {
        console.log('Thao tác sai lỗi 404 Not found :  điều hướng đến khắc phục')
        res.redirect('https://bizfly.vn/techblog/loi-404-not-found-la-gi-nguyen-nhan-va-cach-khac-phuc-sua-loi-hieu-qua.html#techblog_.main_content_blog_Detail_text-1')
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};
module.exports = NotFound;