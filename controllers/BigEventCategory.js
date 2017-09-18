var BigEventCategory = require('../models/BigEventCategory'),
  BigEvent = require('../models/BigEvent'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.save = function(req, res, next) {
  var categories = req.body.bigEventCategories;
  BigEventCategory.insertMany(categories).then(function(result) {
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
  BigEventCategory.findByIdAndUpdate(req.params.id, req.body.bigEventCategory).then(function(result) {
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
  BigEventCategory.find({}).then(function(results) {
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
  BigEventCategory.findById(req.params.id).then(function(result) {
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
  BigEventCategory.remove({ _id: _id }).then(function(result) {
    BigEvent.remove({ category: _id });
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}
