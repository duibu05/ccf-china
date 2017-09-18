var User = require('../models/User'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.addUser = function(req, res, next) {
  var user = req.body.user;

  var userModel = new User();
  _.extend(userModel, user);
  User.findOne({ username: user.username }).then(function(result) {
    if (!result)
      userModel.save().then(function(result) {
        res.json({
          code: CONF.SANTEL_RESULTS.SUCCESS.code,
          msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
          data: result
        });

      }).catch(function(err) {
        next(err);
      });
    else
      res.json({
        code: CONF.SANTEL_RESULTS.USER_EXIST_ERR.code,
        msg: CONF.SANTEL_RESULTS.USER_EXIST_ERR.msg,
      });
  }).catch(function(err) {
    next(err);
  });
};

exports.updateUser = function(req, res, next) {
  var user = req.body.user;

  var userModel = User.findByIdAndUpdate(user._id, user).then(function(result) {
    result.password = '';
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  });
};

exports.updatePassword = function(req, res, next) {
  var user = req.body.user;

  var userModel = new User();
  User.findById(user._id).then(function(result) {
    if (result) {
      _.extend(userModel, result);
      userModel.password = user.password;
      userModel.save().then(function(result) {
        res.json({
          code: CONF.SANTEL_RESULTS.SUCCESS.code,
          msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
          data: result
        });
      }).catch(function(err) {
        next(err);
      })
    } else {

    }
  }).catch(function(err) {
    next(err);
  })
};

exports.delUser = function(req, res, next) {
  var username = req.params.username;
  User.remove({ username: username }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  })
}

exports.findUser = function(req, res, next) {
  User.findOne({ username: req.params.username }, 'name username phone meta role').then(function(result) {
    res.json({ code: 200, msg: 'ok', data: result });
  }).catch(function(err) {
    next(err);
  })
};

exports.queryUsers = function(req, res, next) {
  User.find({}, 'name username phone meta role').then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result,
      })
    })
    .catch(function(err) {
      next(err);
    })
}
