'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const CONF = require('../config/conf');

var ImportantDateSchema = new Schema({
  event: {
    type: String,
    trim: true,
    required: '事件名称必填！',
    default: ''
  },
  date: {
    type: String,
    trim: true,
    required: '事件日期必填！',
    default: ''
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  }
}, { _id: false });

var ValuesSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: '价值观标题必填！',
    default: ''
  },
  url: {
    type: String,
    trim: true,
    required: '价值观图片url必填！',
    default: ''
  },
  brief: {
    type: String,
    trim: true,
    required: '价值观描述必填！',
    default: ''
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  }
}, { _id: false });

var CompanySchema = new Schema({
  brief: {
    type: String,
    trim: true,
    default: '',
  },
  picture: {
    type: String,
    trim: true,
  },
  values: [ValuesSchema],
  importantDates: [ImportantDateSchema],
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

CompanySchema.pre('save', function(next) {
  if (!this.isNew)
    this.meta.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Company', CompanySchema);
