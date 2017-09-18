var WhitePaper = require('../models/WhitePaper'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.save = function(req, res, next) {
  var whitePaper = req.body.whitePaper;
  var whitePaperModel = new WhitePaper();
  _.extend(whitePaperModel, whitePaper);
  whitePaperModel.save().then(function(result) {
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
  var whitePaper = req.body.whitePaper;

  WhitePaper.findByIdAndUpdate(whitePaper._id, whitePaper).then(function(result) {
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

  WhitePaper.findById(_id).then(function(result) {
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
  WhitePaper.find({}).then(function(results) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: results
    });
  }).catch(function(err) {
    next(err);
  });
}

exports.delWhitePaper = function(req, res, next) {
  var _id = req.params.id;
  WhitePaper.remove({ _id: _id }).then(function(result) {
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
