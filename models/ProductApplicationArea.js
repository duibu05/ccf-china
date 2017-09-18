'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * ProductApplicationArea 应用领域
 */
var ProductApplicationAreaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: '应用领域名称不能为空！',
    default: '',
  },
  order:Number,
  categories: [{
    name: {
      type: String,
      trim: true,
      require: '应用领域中产品分类不能为空',
      default: ''
    }
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

ProductApplicationAreaSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ProductApplicationArea', ProductApplicationAreaSchema);
