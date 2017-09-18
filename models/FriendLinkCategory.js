'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FriendLinkCategorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: '分类名称不能为空！',
    default: '',
  },
  links: [{
    url: String,
    name: String,
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
});

FriendLinkCategorySchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FriendLinkCategory', FriendLinkCategorySchema);
