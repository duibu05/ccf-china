var FriendLinkCategory = require('../models/FriendLinkCategory'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.showFriendLinks = function(req, res) {
  FriendLinkCategory.find({}).then(function(result) {
    req.body.friendLinkCategories = result;

    res.render('friend-links', req.body);
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var friendLinkCategories = req.body.friendLinkCategories;

  FriendLinkCategory.insertMany(friendLinkCategories).then(function(result) {
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
  FriendLinkCategory.findById(req.params.id).then(function(result) {
    var newCategory = req.body.friendLinkCategory;
    result.links = _.union(result.links, newCategory.links);
    result.title = !!newCategory.title ? newCategory.title : result.title;
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

exports.updateLink = function(req, res, next) {
  var _id = req.params.id;
  var index = req.params.index;
  FriendLinkCategory.findById(_id).then(function(result) {
    _.extend(result.links[index], req.body.link)
    result.save();
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
  FriendLinkCategory.find({}).then(function(results) {
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
  FriendLinkCategory.findById(req.params.id).then(function(result) {
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
  FriendLinkCategory.remove({ _id: _id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}

exports.delLink = function(req, res, next) {
  var _id = req.params.id;
  var index = req.params.index;
  FriendLinkCategory.findById(_id).then(function(result) {
    result.links.splice(index, 1);
    result.save();
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err)
  })
}
