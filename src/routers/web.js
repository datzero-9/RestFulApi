const express = require('express')
const router = express.Router();

const { getItem, getHomepage, listProductCategory } = require('../controllers/crudProducts/read')
const { Create, addProduct } = require('../controllers/crudProducts/create')
const { updateCourse, edit } = require('../controllers/crudProducts/edit')
const { createRegister, dangnhap, infoUser, changeInfo, getListUser } = require('../controllers/accounts/register')
const deleteProduct = require('../controllers/crudProducts/delete')
const getItemSearch = require('../controllers/Search/search');
const getCategory = require('../controllers/category/read');
const createCategory = require('../controllers/category/create');
const deleteCategory = require('../controllers/category/delete');
const { updateCategory, getItemCategory } = require('../controllers/category/update');
const NotFound = require('../controllers/URLNotFound/NotFound');
const { Checkout, updateState, Payment, Callback } = require('../controllers/checkout/checkout');
const { getCart, createCart, deleteCart, deleteAllCart } = require('../controllers/Cart/Cart');
const { getHistories, getAllHistories } = require('../controllers/histories/histories');
const { createComment, getComment } = require('../controllers/Comment/Comment');
const { getOrderDetail } = require('../controllers/orderDetail/orderDetail');
const {Revenue} = require('../controllers/revenue/revenue');


//tài khoản
router.post('/register', createRegister)
router.post('/login', dangnhap)
router.post('/info', infoUser)
router.post('/changeInfo', changeInfo)
router.get('/listUser', getListUser)
// crud category
router.get('/category', getCategory)
router.post('/createCategory', createCategory)
router.delete('/deleteCategory/:id', deleteCategory)

router.post('/getItemCategory', getItemCategory)
router.put('/updateCategory/:id', updateCategory)
//commnet
router.post('/comment', createComment)
router.post('/getComment', getComment)

//crud product
router.post('/', getHomepage)
// router.get('/add', addProduct)
router.post('/createProduct', Create)
router.get('/getProduct/:id', edit)
router.put('/updateProduct/:id', updateCourse)
router.delete('/deleteProduct/:id', deleteProduct)
router.post('/detail', getItem)
router.post('/search', getItemSearch)
// router.get('/', getHomepage)
router.get('/listProductCategory/:name', listProductCategory) // đaya nè


//Cart
router.post('/getCart', getCart)
router.post('/addCart', createCart)
router.delete('/deleteCart/:id', deleteCart)
router.delete('/deleteAllCart/:id', deleteAllCart)

//checkout (state order)
router.post('/checkout', Checkout)
router.post('/updateState', updateState)
router.post('/payment', Payment)
router.post('/callback', Callback)

// order(history)
router.post('/getHistories', getHistories)
router.get('/getAllHistories', getAllHistories)
router.post('/orderdetail', getOrderDetail)


router.get('/revenue', Revenue)
// router.post('/course/create', Create)
// router.put('/course/update/:id', updateCourse)
// router.get('/course/edit/:id', edit)
// router.get('/course/delete/:id', deleteProduct)
//user
//lỗi điều hướng
router.get('/:id', NotFound)
module.exports = router;