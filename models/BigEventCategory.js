'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  BigEvent = require('./BigEvent');
// const CONF = require('../config/conf');

var BigEventCategorySchema = new Schema({
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

BigEventCategorySchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BigEventCategory', BigEventCategorySchema);
