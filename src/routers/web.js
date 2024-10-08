const express = require('express')
const router = express.Router();

const {getItem, getHomepage} = require('../controllers/crudProducts/read')
const {Create ,addProduct} = require('../controllers/crudProducts/create')
const {updateCourse,edit} = require('../controllers/crudProducts/edit')

const deleteCourse = require('../controllers/crudProducts/delete')
const  getItemSearch  = require('../controllers/Search/search');



router.get('/',getHomepage)
router.post('/detail',getItem)

router.post('/search',getItemSearch)


router.get('/add',addProduct)
router.post('/course/create',Create)
router.put('/course/update/:id',updateCourse)
router.get('/course/edit/:id',edit)
router.get('/course/delete/:id',deleteCourse)

module.exports = router;