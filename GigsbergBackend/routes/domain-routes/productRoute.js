const express = require('express');
const productController = require('../../controllers/domain-controllers/productController');
const authToken = require('../../middlewares/authTokenMiddleware');
const router = express.Router();

// Product routes
router.post('/', authToken, productController.postProducts);
router.get('/', authToken, productController.getProducts);
router.put('/:id', authToken, productController.putProducts);
router.delete('/:id', authToken, productController.deleteProducts);

router.get('/search', authToken, productController.searchProducts);

module.exports = router;
