var ProductApplicationAreaAdvantage = require('../models/ProductApplicationAreaAdvantage'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.save = function(req, res, next) {
  var advantage = req.body.advantage;
  ProductApplicationAreaAdvantage.insertMany([advantage]).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result[0]
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.update = function(req, res, next) {
  ProductApplicationAreaAdvantage.findByIdAndUpdate(req.params.id, req.body.advantage).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

// 获取当前应用领域下的优势
exports.queryByApplicationAreaId = function(req, res, next) {
  ProductApplicationAreaAdvantage.find({ 'applicationAreaId': req.params.applicationAreaId }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.queryById = function(req, res, next) {
  ProductApplicationAreaAdvantage.findById(req.params.id).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.del = function(req, res, next) {
  ProductApplicationAreaAdvantage.remove({ _id: req.params.id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};
