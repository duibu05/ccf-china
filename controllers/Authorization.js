var User = require('../models/User'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }).then(function(result) {

    if (result) {
      result.comparePassword(password, function(err, isMatch) {
        if (err) next(err);
        if (isMatch) {
          result.password = '';
          req.session._id = result._id;
          res.json({
            code: CONF.SANTEL_RESULTS.SUCCESS.code,
            msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
            data: result,
          });
        } else {
          res.json({
            code: CONF.SANTEL_RESULTS.WRONG_PASSWORD_OR_ACCOUNT_ERR.code,
            msg: CONF.SANTEL_RESULTS.WRONG_PASSWORD_OR_ACCOUNT_ERR.msg
          });
        }
      });
    } else {
      res.json({
        code: CONF.SANTEL_RESULTS.WRONG_PASSWORD_OR_ACCOUNT_ERR.code,
        msg: CONF.SANTEL_RESULTS.WRONG_PASSWORD_OR_ACCOUNT_ERR.msg
      });
    }
  }).catch(function(err) {
    next(err);
  });
};

exports.signout = function(req, res, next) {
  delete req.session._id;
  res.json({
    code: CONF.SANTEL_RESULTS.SUCCESS.code,
    msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
  });
};
