'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  email: {
    required: '邮箱为必填项！',
    match: [/.+\@.+\..+/, '请输入一个有效的邮箱地址'],
    type: String,
    trim: true,
  },
  isHeadOffice: {
    type: Number,
    required: '是否是总部为必填项！',
    default: 0,
  },
  address: {
    type: String,
    required: '地址为必填项！',
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    required: '电话为必填项！',
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

ContactSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);
