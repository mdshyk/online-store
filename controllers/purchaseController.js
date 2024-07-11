const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
        const decrement = req.body.quantity;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(
                new AppError('Product does not exist', 401)
            );
        }
        if (decrement === 0) {
            return next(new AppError('Insufficient product quantity', 400));
        }

        if (product.quantity < decrement) {
            return next(new AppError('Product Out of Stock', 400));
        }

        product.quantity -= decrement;
        await product.save();

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
});

exports.purchaseProduct = catchAsync(async (req, res, next) => {
    const decrement = 1;
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new AppError('Product does not exist', 401)
        );
    }

    if (product.quantity < decrement) {
        return next(new AppError('Product Out of Stock', 400));
    }

    product.quantity -= decrement;
    await product.save();

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});
