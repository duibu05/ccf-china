'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// const CONF = require('../config/conf');

var NewsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require:'新闻标题不能为空！',
    default: '',
  },
  author: String,
  content: {
    type: String,
    trim: true,
    require:'新闻内容不能为空！',
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

NewsSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('News', NewsSchema);
