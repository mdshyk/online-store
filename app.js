const express = require('express');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// ROUTES
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'FAIL',
        message: `Can't find ${req.originalUrl} on this server.`
    });
});

module.exports = app;