var BigEvent = require('../models/BigEvent'),
  BigEventCategory = require('../models/BigEventCategory'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.showBigEventsByCategory = function(req, res) {
  BigEventCategory.findById(req.params.id).then(function(result) {
    var category = result;
    BigEvent.find({ category: category._id }).then(function(result) {
      req.body.bigEvents = result;

      req.body.category = category;
      res.render('big-events', req.body);
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var bigEvents = req.body.bigEvents;
  BigEvent.insertMany(bigEvents).then(function(result) {
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
  BigEvent.findByIdAndUpdate(req.params.id, req.body.bigEvent).then(function(result) {
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
  BigEvent.find({}).populate({ path: 'category', model: BigEventCategory }).then(function(results) {
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
  BigEvent.findById(req.params.id).then(function(result) {
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
  BigEvent.remove({ _id: _id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}
