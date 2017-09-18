var Banner = require('../models/Banner'),
  RecommandedAA = require('../models/RecommandedAA');

const CONF = require('../config/conf');

exports.index = function(req, res) {
  Banner.find({}).then(function(banners) {
    RecommandedAA.find({}).then(function(recommandedAAs) {
      res.render('index', { banners: banners, recommandedAAs: recommandedAAs, applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain:CONF.QINIU_CONF.OUTPUT_DOMAIN});
    }).catch(function(err) {

    })
  }).catch(function(err) {

  })
}
