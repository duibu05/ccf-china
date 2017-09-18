var News = require('../models/News'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.show = function(req, res) {
  News.find({}).then(function(result) {
    req.body.news = _.orderBy(result, ['meta.updatedAt', 'meta.createdAt'], ['desc', 'desc']);
    res.render('news', req.body);
  }).catch(function(err) {

  })
}

exports.showDetails = function(req, res) {
  News.findById(req.params.id).then(function(result) {
    req.body.news = result;
    res.render('news-details', req.body);
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var news = req.body.news;
  if (!news._id) {
    var newsModel = new News();
    _.extend(newsModel, news);
    newsModel.save().then(function(result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result
      });
    }).catch(function(err) {
      next(err);
    });
  } else {
    News.findById(news._id).then(function(result) {
      if (!!result) {
        if (result.author.indexOf(news.author) === -1) {
          result.author += ' ' + news.author;
        }
        delete news.author;
        _.extend(result, news);
        result.save().then(function(result) {
          res.json({
            code: CONF.SANTEL_RESULTS.SUCCESS.code,
            msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
            data: result
          });
        }).catch(function(err) {
          next(err);
        });
      }
    }).catch(function(err) {
      next(err);
    });
  }
}

exports.queryById = function(req, res, next) {
  var _id = req.params.id;

  News.findById(_id).then(function(result) {
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
  News.find({}).select('title author meta').sort({ 'meta.createdAt': 'desc' }).then(function(results) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: results
    });
  }).catch(function(err) {
    next(err);
  });
}

exports.delNews = function(req, res, next) {
  var _id = req.params.id;
  News.remove({ _id: _id }).then(function(result) {
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
