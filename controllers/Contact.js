var Contact = require('../models/Contact'),
  _ = require('lodash');

const CONF = require('../config/conf');

exports.show = function(req, res) {
  req.body.qiniuDownloadDomain = CONF.QINIU_CONF.OUTPUT_DOMAIN;
  req.body.distributors = [];
  Contact.find({}).then(function(result) {
    for (var idx in result)
      if (result[idx].isHeadOffice)
        req.body.headOffice = result[idx];
      else
        req.body.distributors.push(result[idx]);

    res.render('contact', req.body);
  }).catch(function(err) {

  })
}

exports.contactHeadOffice = function(req, res) {
  req.body.qiniuDownloadDomain = CONF.QINIU_CONF.OUTPUT_DOMAIN;
  Contact.findOne({ isHeadOffice: 1 }).then(function(result) {
    req.body.headOffice = result;
    res.render('support', req.body);
  }).catch(function(err) {

  })
}

exports.save = function(req, res, next) {
  var contact = req.body.contact;
  if (contact._id) {
    Contact.findByIdAndUpdate(contact._id, contact).then(function(result) {
      if (result)
        res.json({
          code: CONF.SANTEL_RESULTS.SUCCESS.code,
          msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
          data: result
        });
    }).catch(function(err) {
      next(err);
    });
  } else {
    var contactModel = new Contact();
    console.log(contactModel);
    console.log(contact);
    _.extend(contactModel, contact);
    console.log(contactModel);
    contactModel.save().then(function(result) {
      if (result)
        res.json({
          code: CONF.SANTEL_RESULTS.SUCCESS.code,
          msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
          data: result
        });
    }).catch(function(err) {
      next(err);
    });
  }
};

exports.delContact = function(req, res, next) {
  var _id = req.params.id;
  Contact.remove({ _id: _id }).then(function(result) {
    res.json({
      code: CONF.SANTEL_RESULTS.SUCCESS.code,
      msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
      data: result
    });
  }).catch(function(err) {
    next(err);
  })
}

exports.queryById = function(req, res, next) {
  Contact.findById(req.params.id).then(function(result) {
    if (result) {
      res.json({
        code: CONF.SANTEL_RESULTS.SUCCESS.code,
        msg: CONF.SANTEL_RESULTS.SUCCESS.msg,
        data: result,
      });
    }
  }).catch(function(err) {
    next(err);
  })
};

exports.queryHeadOffice = function(req, res, next) {
  Contact.findOne({ isHeadOffice: 1 }).then(function(result) {
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
  Contact.find({ isHeadOffice: 0 }).then(function(results) {
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
