'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Banner 应用领域
 */
var BannerSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: '标题不能为空！',
    default: '',
  },
  brief: {
    type: String,
    trim: true,
    require: '描述不能为空！',
    default: '',
  },
  applicationArea: {
    _id: Schema.Types.ObjectId,
    category: {
      _id: Schema.Types.ObjectId,
    }
  },
  url: {
    type: String,
    trim: true,
    require: '图片不能为空！',
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

})

BannerSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Banner', BannerSchema);
