var Solution = require('../models/Solution'),
  _ = require('lodash');

const CONF = require('../config/conf');


exports.showSolutionDetails = function(req, res) {
  Solution.findById(req.params.id).then(function(result) {
    var solution = result;
    res.render('solution-details', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, solution: solution});

  }).catch(function(err) {

  })
}

// exports.showSolutionsByCategory = function(req, res) {
//   Solution.find({ 'applicationArea.category._id': req.params.id }).then(function(solutions) {
//     res.render('solution-details', { applicationAreas: req.body.applicationAreas, faqCategories: req.body.faqCategories, i18n: I18N, qiniuDownloadDomain: CONF.QINIU_CONF.OUTPUT_DOMAIN, solution: solutions[0], solutions: solutions });
//   }).catch(function(err) {

//   })
// }

exports.queryById = function(req, res, next) {
  Solution.findById(req.params.id).then(function(result) {
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
  Solution.find({ 'applicationArea.category._id': req.params.id }).then(function(result) {
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
  Solution.find({ 'applicationArea._id': req.params.id }).sort('order').then(function(result) {
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
  var solution = req.body.solution;
  Solution.insertMany([solution]).then(function(result) {
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
  Solution.findById(req.body.solution._id).then(function(result) {
    result.advantages.push(req.body.solution.advantages[0]);
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
  Solution.findById(req.body.solution._id).then(function(result) {
    result.techSpecs.push(req.body.solution.techSpecs[0]);
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
  Solution.findByIdAndUpdate(req.params.id, req.body.solution).then(function(result) {
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
  Solution.findById(req.body.solution._id).then(function(result) {
    _.extend(result.advantages[index], req.body.solution.advantages[0]);
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
  Solution.findById(req.body.solution._id).then(function(result) {
    _.extend(result.techSpecs[index], req.body.solution.techSpecs[0]);
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
  Solution.remove({ _id: req.params.id }).then(function(result) {
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
  Solution.findById(req.params.id).then(function(result) {
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
  Solution.findById(req.params.id).then(function(result) {
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
