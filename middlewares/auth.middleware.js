const CONF = require("../config/conf");
var _ = require('lodash'),
  User = require('../models/User'),
  ApplicationArea = require('../models/ProductApplicationArea'),
  Solution = require('../models/Solution'),
  FaqCategory = require('../models/FaqCategory'),
  BigEventCategory = require('../models/BigEventCategory'),
  WhitePaper = require('../models/WhitePaper'),
  Setting = require('../models/Setting'),
  Application = require('../models/Application'),
  uuid = require('uuid'),
  bunyan = require('bunyan'),
  log = bunyan.createLogger({ name: "middlewares" });;

exports.requireSignin = function(req, res, next) {
  if (req.session._id) {
    next();
  } else {
    res.json({
      code: CONF.SANTEL_RESULTS.AUTHORITY_INVALID_ERR.code,
      msg: CONF.SANTEL_RESULTS.AUTHORITY_INVALID_ERR.msg
    })
  }
}

exports.requireSuperAdmin = function(req, res, next) {
  User.findById(req.session._id).then(function(result) {
    if (result && result.role === 0)
      next();
    else
      res.json({
        code: CONF.SANTEL_RESULTS.AUTHORITY_NOT_ACCESS_ERR.code,
        msg: CONF.SANTEL_RESULTS.AUTHORITY_NOT_ACCESS_ERR.msg
      });
  }).catch(function(err) {
    next(err);
  });
}

exports.superAdminOrMyself = function(req, res, next) {
  User.findById(req.session._id).then(function(result) {
    if (result && (result.role === 0 || req.body.user._id === req.session._id))
      next();
    else
      res.json({
        code: CONF.SANTEL_RESULTS.AUTHORITY_NOT_ACCESS_ERR.code,
        msg: CONF.SANTEL_RESULTS.AUTHORITY_NOT_ACCESS_ERR.msg
      });
  }).catch(function(err) {
    next(err);
  });
}

exports.userModuleErrorHandler = function(err, req, res, next) {
  // console.log(err);
  if (err.name === 'MongoError' && err.code === 11000) {
    res.json({
      code: CONF.SANTEL_RESULTS.USER_EXIST_ERR.code,
      msg: CONF.SANTEL_RESULTS.USER_EXIST_ERR.msg,
    });

  } else if (err.name === 'ValidationError') {
    var errFieldName = Object.keys(err.errors)[0];
    res.json({
      code: CONF.SANTEL_RESULTS.VALIDATION_ERR.code,
      msg: CONF.SANTEL_RESULTS.VALIDATION_ERR.code,
      data: { name: errFieldName, msg: err.errors[errFieldName].message },
    });
  } else {
    res.json({
      code: res.status,
      msg: err.message,
      data: err.name,
    });
  }
}

exports.fetchApplicationAreas = function(req, res, next) {
  ApplicationArea.find({}).sort('order').then(function(result) {
    req.body.applicationAreas = result;
    next();
  }).catch(function(err) {
    next(err);
  })
}

exports.fetchFaqCategories = function(req, res, next) {
  FaqCategory.find({}).then(function(result) {
    req.body.faqCategories = result;
    next();
  }).catch(function(err) {
    next(err);
  })
}

exports.fetchWhitePapers = function(req, res, next) {
  WhitePaper.find({}).then(function(result) {
    req.body.whitePapers = result;
    next();
  }).catch(function(err) {
    next(err);
  })
}
exports.fetchApplications = function(req, res, next) {
  Application.find({}).then(function(result) {
    req.body.applications = result;
    next();
  }).catch(function(err) {
    next(err);
  })
}

exports.fetchSolutions = function(req, res, next) {
  Solution.find({}).sort('order').then(function(results) {
    res.locals.solutions = results;
    next();
  }).catch(function(err) {
    next(err);
  });
}

exports.fetchBigEventCategories = function(req, res, next) {
  BigEventCategory.find({}).then(function(results) {
    res.locals.bigEventCategories = results;
    next();
  }).catch(function(err) {
    next(err);
  })
}

exports.loadSetting = function(req, res, next) {
  var i18n = req.app.locals.i18n;
  WhitePaper.find({}).then(function(results) {
    req.app.locals.whitePaperSize = results.length;
  }).catch(function(err) {

  });
  if (!!i18n) {
    next();
  } else {
    Setting.findOne({}).then(function(result) {
      req.app.locals.i18n = JSON.parse(result.content);
      next();
    }).catch(function(err) {
      next(err);
    })
  }
}
