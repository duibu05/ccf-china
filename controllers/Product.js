var Product = require('../models/Product'),
  Advantage = require('../models/ProductApplicationAreaAdvantage'),
  ApplicationArea = require('../models/ProductApplicationArea'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.showRelationalProducts = function(req, res) {
  Advantage.findById(req.params.id).then(function(result) {
    var advantage = result;
    ApplicationArea.findById(advantage.applicationAreaId).then(function(result) {
      var applicationArea = result;
      Product.find({ _id: { $in: advantage.products } }).then(function(products) {
        res.render('aaa-product-list', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, products: products, applicationArea: applicationArea })
      }).catch(function(err) {

      })
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}

exports.showProductDetails = function(req, res) {
  Product.findById(req.params.id).then(function(result) {
    var product = result;
    Product.find({ 'applicationArea.category._id': product.applicationArea.category._id }).then(function(products) {
      res.render('product-details', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, product: product, products: products });
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}

exports.showProductsByCategory = function(req, res) {
  Product.find({ 'applicationArea.category._id': req.params.id }).sort('order').then(function(products) {
    res.render('product-details', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, product: products[0], products: products });
  }).catch(function(err) {

  })
}

exports.queryById = function(req, res, next) {
  Product.findById(req.params.id).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

// 获取当前产品分类下的产品列表
exports.queryByCategoryId = function(req, res, next) {
  Product.find({ 'applicationArea.category._id': req.params.id }).sort('order').then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.queryByApplicationAreaId = function(req, res, next) {
  Product.find({ 'applicationArea._id': req.params.id }).sort('order').then(function(result) {
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
  var product = req.body.product;
  Product.insertMany([product]).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result[0]
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.saveAdvantage = function(req, res, next) {
  Product.findById(req.body.product._id).then(function(result) {
    result.advantages.push(req.body.product.advantages[0]);
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
};

exports.saveTechSpec = function(req, res, next) {
  Product.findById(req.body.product._id).then(function(result) {
    result.techSpecs.push(req.body.product.techSpecs[0]);
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

exports.update = function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body.product).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.updateAdvantage = function(req, res, next) {
  var index = req.params.index;
  Product.findById(req.body.product._id).then(function(result) {
    _.extend(result.advantages[index], req.body.product.advantages[0]);
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
};

exports.updateTechSpec = function(req, res, next) {
  var index = req.params.index;
  Product.findById(req.body.product._id).then(function(result) {
    _.extend(result.techSpecs[index], req.body.product.techSpecs[0]);
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
};

exports.del = function(req, res, next) {
  Product.remove({ _id: req.params.id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
};

exports.delAdvantage = function(req, res, next) {
  Product.findById(req.params.id).then(function(result) {
    if (result) {
      result.advantages.splice(req.params.index, 1);
      result.save();
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      });
    }
  }).catch(function(err) {
    next(err)
  })
};

exports.delTechSpec = function(req, res, next) {
  Product.findById(req.params.id).then(function(result) {
    if (result) {
      result.techSpecs.splice(req.params.index, 1);
      result.save();
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      });
    }
  }).catch(function(err) {
    next(err)
  })
};
