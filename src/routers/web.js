const express = require('express')
const router = express.Router();
const { getHomepage, getCourse, Create, updateCourse, edit,deleteCourse } = require('../controllers/homeController')


router.get('/',getHomepage)

router.post('/course/create',Create)
router.get('/course/:slug',getCourse)
router.get('/course/update/:id',updateCourse)
router.put('/course/edit/:id',edit)
router.delete('/course/delete/:id',deleteCourse)

module.exports = router;