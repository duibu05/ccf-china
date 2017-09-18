var ProductApplicationArea = require('../models/ProductApplicationArea'),
  Advantage = require('../models/ProductApplicationAreaAdvantage'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.showAdvantages = function(req, res) {
  Advantage.find({ applicationAreaId: req.params.id }).then(function(result) {
    var advantages = result;
    ProductApplicationArea.findById(req.params.id).then(function(result) {
      res.render('application-area-advantage', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, advantages: advantages, applicationArea: result });
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var applicationArea = req.body.applicationArea;
  var applicationAreaModel = new ProductApplicationArea();
  _.extend(applicationAreaModel, applicationArea);
  applicationAreaModel.save().then(function(result) {
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
  var applicationArea = req.body.applicationArea;
  console.log(req.body.applicationArea.categories);

  ProductApplicationArea.findById(applicationArea._id).then(function(result) {
    if (result) {
      result.categories = _.unionWith(applicationArea.categories, result.categories, function(o1, o2) {
        return _.isEqual(o1.name, o2.name);
      });
      result.name = applicationArea.name;
      result.order = applicationArea.order;

      console.log(result.categories);
      result.save().then(function(result) {
        res.json({
          code: CONF.SANTEL_RESULTS.SUCCESS.code,
          msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
          data: result
        });
      }).catch(function(err) {
        next(err)
      })
    }
  }).catch(function(err) {
    next(err);
  });
}

exports.updateCategory = function(req, res, next) {
  var category = req.body.category;

  ProductApplicationArea.findById(req.params.id).then(function(result) {
    result.categories[req.params.index].name = category.name;
    result.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err)
    })
  }).catch(function(err) {
    next(err)
  })
}

exports.queryById = function(req, res, next) {
  var _id = req.params.id;

  ProductApplicationArea.findById(_id).then(function(result) {
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
  ProductApplicationArea.find({}).sort('order').then(function(results) {
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
  ProductApplicationArea.remove({ _id: _id }).then(function(result) {
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

exports.delCategory = function(req, res, next) {
  var _id = req.params.id;

  ProductApplicationArea.findById(_id).then(function(result) {
    if (result.categories.length === 1) {
      res.json({
        code: CONF.SANTEL_RESULTS.PRODUCT_CATEGORIES_EMPTY_ERROR.code,
        msg: CONF.SANTEL_RESULTS.PRODUCT_CATEGORIES_EMPTY_ERROR.msg,
      });
      return;
    }

    result.categories.splice(req.params.index, 1);

    result.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err)
    });

  }).catch(function(err) {
    next(err);
  });
}
