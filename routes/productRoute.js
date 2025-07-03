const express = require('express');
const router = express.Router();

const {createProduct,createCategory,getProducts} = require('../controllers/productController');

router.post('/', createProduct);
router.post('/category', createCategory);
router.get('/', getProducts);

module.exports = router;