'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Product 应用领域
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: '名称不能为空！',
    default: '',
  },
  order: {
    type: Number
  },
  applicationArea: {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      require: '应用领域名称不能为空!',
      trim: true
    },
    category: {
      _id: {
        type: Schema.Types.ObjectId,
        require: '产品分类ID不能为空！',
      },
      name: {
        type: String,
        trim: true,
        require: '产品分类名称不能为空',
        default: ''
      }
    },
  },
  advantages: [{
    title: {
      type: String,
      require: '优势标题不能为空！',
      trim: true,
    },
    brief: {
      type: String,
      require: '优势简介不能为空！',
      trim: true,
    },
    url: {
      type: String,
      require: '相关图片不能为空！',
      trim: true,
    },
    layout: Number,
  }],
  techSpecs: [{
    name: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
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

ProductSchema.pre('update', function(next) {
  console.log('pre save begin');
  if (!this.isNew) {
    this.meta.updatedAt = Date.now();
    console.log('updateeeeeee');
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
