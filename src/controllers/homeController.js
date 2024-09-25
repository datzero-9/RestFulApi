const Course = require('../models/crud')


const getHomepage = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('index.ejs', { courses });
        // res.json(courses)
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}

//get /course/:slug
const getCourse = async (req, res) => {
    try {
        console.log({ slug: req.params.slug })
        const course = await Course.findOne({ slug: req.params.slug })
        res.render('detail.ejs', { course });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
//create
const Create = async (req, res) => {
    console.log(req.body)
    try {
        const newCourse = new Course({
            name: req.body.name, // Giả sử thông tin sản phẩm được gửi qua body request
            description: req.body.description,
            image: 'https://i.ytimg.com/vi/z2f7RHgvddc/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCML-byK5TPhWN_-ZuZal4h5KasYw',
            // slug: req.body.name + 'xyx'
        });
        const course = await newCourse.save(); // Lưu sản phẩm mới vào cơ sở dữ liệu
        res.redirect('/')
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send('Lỗi không thể thêm dữ liệu');
    }
}



const updateCourse = async (req, res) => {
    try {
        console.log({ id: req.params.id })
        const course = await Course.findById(req.params.id)
        console.log(course)
        res.render('html/crud/update.ejs', { course });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}
//PUT
const edit = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id)
        course.name = req.body.name;
        course.description = req.body.description;
        await course.save()
        res.redirect('/');
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteCourse = async (req, res) => {
    try {
        // Loại bỏ khoảng trắng cuối cùng trong chuỗi ID
        const courseId = req.params.id;

        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).send('Không tìm thấy khóa học để xóa.');
        }

        res.redirect('/');
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
};

module.exports = {
    getHomepage,
    getCourse,
    Create,
    updateCourse,
    edit,
    deleteCourse
}