var Setting = require('../models/Setting'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.queryOne = function(req, res, next) {
  Setting.findOne({}).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.save = function(req, res, next) {
  Setting.remove({}).then(function(result) {}).catch(function(err) {});
  Setting.insertMany([{ content: req.body.content }]).then(function(result) {
    req.app.locals.i18n = JSON.parse(req.body.content);
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  })
}
