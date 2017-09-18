'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Setting 应用领域
 */
var SettingSchema = new Schema({
  content: {
    type: String,
    trim: true,
    require: '内容不能为空！',
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

module.exports = mongoose.model('Setting', SettingSchema);
