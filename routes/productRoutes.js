const express = require('express');
const productController = require('../controllers/productController');
const purchaseController = require('../controllers/purchaseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/all', productController.getAllProducts)

router
    .route('/')
    .get(authController.protect, productController.getProducts)
    .post(authController.protect, authController.restrictTo('admin'), productController.createProduct);

router
    .route('/:id')
    .get(authController.protect, productController.getProduct)
    .patch(authController.protect, productController.updateProduct)
    .delete(authController.protect, productController.deleteProduct)

router
    .post('/addtocart/:id', authController.protect, purchaseController.addToCart)
    .post('/purchase/:id', authController.protect, purchaseController.purchaseProduct);

module.exports = router;