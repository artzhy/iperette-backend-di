const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const BookingSchema = require('./BookingSchema');

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: false
    },
    lastname: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: false
    },
    role: {
      type: String,
      trim: true,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      trim: true,
      index: true
    },
    color: { type: String, trim: true },
    bookings: [BookingSchema],
    hash: String,
    salt: String,
    password: String
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.'
});

UserSchema.pre('save', function(next) {
  const user = this;
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  user.color = color;
  if (!user.isModified('password')) return next();
  user.salt = crypto.randomBytes(16).toString('hex');
  user.password = crypto
    .pbkdf2Sync(user.password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  next();
});

UserSchema.methods.validPassword = function(password) {
  console.log(this.salt);
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      id: this._id,
      firstname: this.firstname,
      role: this.role,
      exp: parseInt(exp.getTime() / 1000)
    },
    process.env.SECRET
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    color: this.color,
    email: this.email,
    token: this.generateJWT()
  };
};

UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    color: this.color,
    email: this.email,
    role: this.role,
    bookings: this.bookings
  };
};

module.exports = mongoose.model('User', UserSchema);
