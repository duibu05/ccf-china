const CONF = require('../config/conf'),
  QINIU_CONF = CONF.QINIU_CONF,
  BUCKET = QINIU_CONF.BUCKET;
var qiniu = require("qiniu");


//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = QINIU_CONF.ACCESS_KEY;
qiniu.conf.SECRET_KEY = QINIU_CONF.SECRET_KEY;

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(BUCKET);
  return putPolicy.token();
}


exports.uptoken = function(req, res) {
  //上传到七牛后保存的文件名
  // key = 'my-nodejs-logo.png';

  token = uptoken(BUCKET);

  res.json({ token: token });
};
