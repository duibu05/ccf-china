'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Solution 应用领域
 */
var SolutionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: '名称不能为空！',
    default: '',
  },
  order: Number,
  applicationArea: {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      require: '应用领域名称不能为空!',
      trim: true
    }
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

SolutionSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Solution', SolutionSchema);
