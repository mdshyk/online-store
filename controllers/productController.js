const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    if (!products || products.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No products found.'
        });
      }

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});

exports.getProducts = catchAsync(async (req, res, next) => {
        const products = await Product.find(
            {
                user : req.user._id
            }
        );

        if (!products || products.length === 0) {
            return res.status(404).json({
              status: 'fail',
              message: 'No products found for this user.'
            });
          }

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
});

exports.getProduct = catchAsync(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (product.user !== req.user._id.toString()) {
            return next(
                new AppError('You are restricted', 401)
            );
        }
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
});


exports.createProduct = catchAsync(async (req, res, next) => {
    req.body.user=req.user._id; 
    const newProduct = await Product.create(req.body);

        res.status(201).json({
            status:'success',
            data: {
                product: newProduct
            }
        });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });

    if (!product) {
        return next(
            new AppError('You are restricted or the product does not exist', 401)
        );
    }

    Object.assign(product, req.body);
    await product.save({ runValidators: true });

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: {
            product
        },
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    // Find the product by ID and user, then delete it if found
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    // If no product is found against the user, handle the error
    if (!product) {
        return next(
            new AppError('You are restricted or the product does not exist', 401)
        );
    }

    // Send the response
    res.status(204).json({
        status: 'success',
        message: 'Product successfully deleted',
        data: {}
    });
});