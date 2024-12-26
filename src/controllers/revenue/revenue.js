const Order = require('../../models/order');

const Revenue = async (req, res) => {
    
    const selectedYear = req.params.year;
    const startOfYear = new Date(`${selectedYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${selectedYear}-12-31T23:59:59.999Z`);
    const orders = await Order.find({
        createdAt: { $gte: startOfYear, $lte: endOfYear },
    }).sort({ createdAt: -1 });

    const monthlyRevenue = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt);
        const month = date.getMonth() + 1; // Lấy tháng (1-12)
        const key = `${selectedYear}-${month.toString().padStart(2, '0')}`; // Định dạng "YYYY-MM"

        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += order.total;
        return acc;
    }, {});

    console.log('Monthly Revenue:', monthlyRevenue);

    // Tạo danh sách các tháng (Tháng 1 - Tháng 12)
    const labels = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ];

    // Tính doanh thu theo thứ tự tháng
    const data = Array(12).fill(0); // Mảng 12 phần tử, khởi tạo bằng 0

    for (let i = 1; i <= 12; i++) {
        const key = `${selectedYear}-${i.toString().padStart(2, '0')}`;
        if (monthlyRevenue[key]) {
            data[i - 1] = monthlyRevenue[key];
        }
    }

    // Cập nhật revenueData với dữ liệu thực tế
    const revenueData = {
        labels,
        datasets: [
            {
                label: `Doanh thu năm ${selectedYear} (VNĐ)`,
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return res.json([revenueData, orders]);
};

module.exports = { Revenue };
