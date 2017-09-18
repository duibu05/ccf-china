'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Faq = require('./Faq');
// const CONF = require('../config/conf');

var FaqCategorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: '分类名称不能为空！',
    default: '',
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

FaqCategorySchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FaqCategory', FaqCategorySchema);
