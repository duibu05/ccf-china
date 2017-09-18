'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * ProductApplicationAreaAdvantage 应用领域
 */
var ProductApplicationAreaAdvantageSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: '应用领域优势名称不能为空！',
    default: '',
  },
  brief: {
    type: String,
    trim: true,
    require: '应用领域优势描述不能为空！',
    default: '',
  },
  applicationAreaId: Schema.Types.ObjectId,
  layout: Number,
  url: {
    type: String,
    trim: true,
    require: '应用领域优势图片不能为空！',
    default: '',
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
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

})

ProductApplicationAreaAdvantageSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ProductApplicationAreaAdvantage', ProductApplicationAreaAdvantageSchema);
