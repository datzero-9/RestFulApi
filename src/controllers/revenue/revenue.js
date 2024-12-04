const Order = require('../../models/order');
const Revenue = async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('GET : /api/revenue');
    console.log('--------------------');
    const orders = await Order.find().sort({ createdAt: -1 });

    // Tạo một map để nhóm dữ liệu theo tháng
    const monthlyRevenue = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt);
        const month = date.getMonth() + 1; // Lấy tháng (1-12)
        const year = date.getFullYear();
        const key = `${year}-${month.toString().padStart(2, '0')}`; // Định dạng "YYYY-MM"
        // Thêm tổng tiền vào tháng tương ứng

        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += order.total;

        return acc;
    }, {});


    // Tạo danh sách các tháng (Tháng 1 - Tháng 12)
    const labels = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    // Tính doanh thu theo thứ tự tháng
    const currentYear = new Date().getFullYear();
    const data = Array(12).fill(0); // Mảng 12 phần tử, khởi tạo bằng 0

    for (let i = 1; i <= 12; i++) {
        const key = `${currentYear}-${i.toString().padStart(2, '0')}`;

        console.log(monthlyRevenue[key])
        if (monthlyRevenue[key]) {
            data[i - 1] = monthlyRevenue[key];
            // console.log(monthlyRevenue[key])
        }
    }

    // Cập nhật revenueData với dữ liệu thực tế
    const revenueData = {
        labels,
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return res.json(revenueData);
};
module.exports = { Revenue };