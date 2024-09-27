const express = require('express')
const router = express.Router();

const getHomepage = require('../controllers/crudProducts/read')
const {Create ,addProduct} = require('../controllers/crudProducts/create')
const {updateCourse,edit} = require('../controllers/crudProducts/edit')

const deleteCourse = require('../controllers/crudProducts/delete')



router.get('/',getHomepage)
router.get('/add',addProduct)
router.post('/course/create',Create)
router.put('/course/update/:id',updateCourse)
router.get('/course/edit/:id',edit)
router.get('/course/delete/:id',deleteCourse)

module.exports = router;