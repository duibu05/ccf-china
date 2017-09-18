var Faq = require('../models/Faq'),
  FaqCategory = require('../models/FaqCategory'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.showFaqsByCategory = function(req, res) {
  FaqCategory.findById(req.params.id).then(function(result) {
    var category = result;
    Faq.find({ category: category._id }).then(function(result) {
      req.body.faqs = result;

      req.body.category = category;
      res.render('faqs', req.body);
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var faqs = req.body.faqs;
  Faq.insertMany(faqs).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  })
}

exports.update = function(req, res, next) {
  Faq.findByIdAndUpdate(req.params.id, req.body.faq).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })

}

exports.query = function(req, res, next) {
  Faq.find({}).populate({ path: 'category', model: FaqCategory }).then(function(results) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: results
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.queryById = function(req, res, next) {
  Faq.findById(req.params.id).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.del = function(req, res, next) {
  var _id = req.params.id;
  Faq.remove({ _id: _id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}
