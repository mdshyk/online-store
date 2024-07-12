const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    type: {
        type: String,
        enum: ['private', 'commercial', 'admin'],
        default: 'private'
      },
    password: {
        type: String,
        required: [true, 'A user must have an password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please re-enter your password'],
        minlength: 8,
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords do not match'
        }
    },
});

userSchema.pre('save', function(next) {

    this.password = bcrypt.hash(this.password, 12);
  
    this.passwordConfirm = undefined;
    next();
  });

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;