const express = require('express')
const router = express.Router();

const { getItem, getHomepage } = require('../controllers/crudProducts/read')
const { Create, addProduct } = require('../controllers/crudProducts/create')
const { updateCourse, edit } = require('../controllers/crudProducts/edit')

const deleteCourse = require('../controllers/crudProducts/delete')
const getItemSearch = require('../controllers/Search/search');
const getCategory = require('../controllers/category/read');
const createCategory = require('../controllers/category/create');
const deleteCategory = require('../controllers/category/delete');
const {updateCategory, getItemCategory} = require('../controllers/category/update');


// crud category
router.get('/category', getCategory)
router.post('/createCategory', createCategory)
router.delete('/deleteCategory/:id', deleteCategory)
router.post('/getItemCategory',getItemCategory)
router.put('/updateCategory/:id',updateCategory)

//crud product
router.get('/', getHomepage)

router.post('/detail', getItem)
router.post('/search', getItemSearch)


router.get('/add', addProduct)
router.post('/course/create', Create)
router.put('/course/update/:id', updateCourse)
router.get('/course/edit/:id', edit)
router.get('/course/delete/:id', deleteCourse)

module.exports = router;