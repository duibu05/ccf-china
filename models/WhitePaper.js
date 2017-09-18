'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// const CONF = require('../config/conf');
var FileSchema = new Schema({
  name: String,
  url: String,
}, { _id: false });
var WhitePaperSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: '新闻标题不能为空！',
    default: '',
  },
  file: FileSchema,
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

WhitePaperSchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('WhitePaper', WhitePaperSchema);
