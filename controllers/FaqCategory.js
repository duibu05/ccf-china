var FaqCategory = require('../models/FaqCategory'),
  Faq = require('../models/Faq'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.save = function(req, res, next) {
  var categories = req.body.faqCategories;
  FaqCategory.insertMany(categories).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  })
}

exports.update = function(req, res, next) {
  FaqCategory.findByIdAndUpdate(req.params.id, req.body.faqCategory).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })

}

exports.query = function(req, res, next) {
  FaqCategory.find({}).then(function(results) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: results
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.queryById = function(req, res, next) {
  FaqCategory.findById(req.params.id).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.del = function(req, res, next) {
  var _id = req.params.id;
  FaqCategory.remove({ _id: _id }).then(function(result) {
    Faq.remove({ category: _id });
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}
