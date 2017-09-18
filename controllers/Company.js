var Company = require('../models/Company'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.show = function(req, res) {
  req.body.qiniuDownloadDomain = CONF.QINIU_CONF.OUTPUT_DOMAIN;

  Company.findOne({}).then(function(result) {
    req.body.company = result;
    res.render('company', req.body);
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var company = req.body.company;

  Company.findOne({}).then(function(result) {
    if (!result) {
      result = new Company();
    }

    if (!!company.brief)
      _.extend(result, company);
    else if (!!company.importantDates)
      result.importantDates = _.unionWith(result.importantDates, company.importantDates, function(o1, o2) {
        return _.isEqual(o1.event, o2.event) && _.isEqual(o1.date, o2.date);
      });
    else {
      var index = company.index;
      if (!!index) {
        result.values[index] = company.values[0];
      } else {
        result.values.push(company.values[0]);
      }
    }


    result.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err);
    });
  }).catch(function(err) {
    next(err);
  });
};

// exports.delCompany = function(req, res, next) {
//   var _id = req.params.id;
//   Company.remove({ _id: _id }).then(function(result) {
//     res.json({
//       code: CONF.SANTEL_RESULTS.SUCCESS.code,
//       msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
//       data: result
//     });
//   }).catch(function(err) {
//     next(err);
//   })
// }

exports.delImportantDate = function(req, res, next) {
  var index = req.params.index;
  Company.findOne({}).then(function(result) {
    result.importantDates.splice(index, 1);
    result.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err);
    })
  }).catch(function(err) {
    next(err);
  })
}

exports.delValues = function(req, res, next) {
  var index = req.params.index;
  Company.findOne({}).then(function(result) {
    result.values.splice(index, 1);
    result.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err);
    })
  }).catch(function(err) {
    next(err);
  })
}

exports.queryById = function(req, res, next) {
  Company.findOne({}).then(function(result) {
    if (!!result && !!result
      .values) {
      for (var i = result.values.length - 1; i >= 0; i--) {
        result.values[i].url = CONF.QINIU_CONF.OUTPUT_DOMAIN + result.values[i].url;
      }
    }
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result,
    });
  }).catch(function(err) {
    next(err);
  })
};

exports.query = function(req, res, next) {
  Company.find({ isHeadOffice: 0 }).then(function(results) {
    if (results) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: results,
      });
    }
  }).catch(function(err) {
    next(err);
  })
};
