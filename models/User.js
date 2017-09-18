'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    unique: '账号已经被占用！',
    required: '账号为必填项！',
    match: [/.+\@.+\..+/, '请输入一个有效的邮箱地址'],
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: '密码不能为空！',
  },
  role: {
    type: Number,
    required: '角色不能为空！',
  }, //0-supter admin,1-publisher
  name: {
    type: String,
    required: '姓名为必填项！',
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!this.isNew)
    user.meta.updatedAt = Date.now();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  })
});

UserSchema.post('save', function(result, next) {
  // hide password
  result.password = '';
  next();
});

UserSchema.methods = {
  comparePassword: function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    })
  }
};

module.exports = mongoose.model('User', UserSchema);
