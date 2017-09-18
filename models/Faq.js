'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// const CONF = require('../config/conf');

var FaqSchema = new Schema({
  question: {
    type: String,
    trim: true,
    require: '问题不能为空！',
    default: '',
  },
  answer: {
    type: String,
    trim: true,
    require: '答案不能为空！',
    default: '',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'FaqCategory',
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

FaqSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Faq', FaqSchema);
