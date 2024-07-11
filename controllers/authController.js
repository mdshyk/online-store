const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = userObj => {
    return jwt.sign({ userObj, createdAt: Date.now() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id)
    
    res.status(201).json({
        status: 'User created',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email });
    console.log(user);

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    const token = signToken(user);
     
    res.status(200).json({
        status: 'success',
        token,
        id: user._id,
        createdAt: new Date(jwt.decode(token).createdAt)
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } 

    if (!token) {
        return next(new AppError('Authorization token not valid', 401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError('Token is expired or invalid', 401));
        }
        req.user = decoded.userObj;
        next();
    });
});

 exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action.', 403)
            );
        }
        next();
    };
 }