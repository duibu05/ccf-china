var Application = require('../models/Application'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.save = function(req, res, next) {
  var application = req.body.application;
  var applicationModel = new Application();
  _.extend(applicationModel, application);
  applicationModel.save().then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  });
}

exports.update = function(req, res, next) {
  var application = req.body.application;

  Application.findByIdAndUpdate(application._id, application).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  });
}

exports.queryById = function(req, res, next) {
  var _id = req.params.id;

  Application.findById(_id).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  });

}

exports.query = function(req, res, next) {
  Application.find({}).then(function(results) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: results
    });
  }).catch(function(err) {
    next(err);
  });
}

exports.del = function(req, res, next) {
  var _id = req.params.id;
  Application.remove({ _id: _id }).then(function(result) {
    if (!!result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }
  }).catch(function(err) {
    next(err);
  });
}
