const express = require('express')
const router = express.Router();

const { getItem, getHomepage } = require('../controllers/crudProducts/read')
const { Create, addProduct } = require('../controllers/crudProducts/create')
const { updateCourse, edit } = require('../controllers/crudProducts/edit')

const deleteProduct = require('../controllers/crudProducts/delete')
const getItemSearch = require('../controllers/Search/search');
const getCategory = require('../controllers/category/read');
const createCategory = require('../controllers/category/create');
const deleteCategory = require('../controllers/category/delete');
const {updateCategory, getItemCategory} = require('../controllers/category/update');
const NotFound = require('../controllers/URLNotFound/NotFound');


// crud category
router.get('/category', getCategory)
router.post('/createCategory', createCategory)
router.delete('/deleteCategory/:id', deleteCategory)
router.post('/getItemCategory',getItemCategory)
router.put('/updateCategory/:id',updateCategory)

//crud product
router.get('/', getHomepage)



router.get('/add', addProduct)
router.post('/createProduct', Create)

// router.put('/updateProduct/:id', updateCourse)

// router.get('/getProduct/:id', edit)
// router.delete('/deleteProduct/:id', deleteProduct)


router.post('/course/create', Create)
router.put('/course/update/:id', updateCourse)
router.get('/course/edit/:id', edit)
router.get('/course/delete/:id', deleteProduct)
//user
router.post('/detail', getItem)
router.post('/search', getItemSearch)
router.get('/:id', NotFound)
module.exports = router;