'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * ProductCategorySchema 产品分类
 */
var ProductCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: ''
  }
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
