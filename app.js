var express = require('express'),
  morgan = require('morgan'),
  bunyan = require('bunyan'),
  path = require('path'),
  xtpl = require('xtpl'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  mongoStore = require('connect-mongo')(session),
  port = process.env.PORT || 3000,
  dburl = require('./config/conf').MONGODB_CONF.URI;
var app = express(),
  log = bunyan.createLogger({ name: "myapp" });

// const SESSION_STORE_CONF = require('./config/conf').SESSION_STORE_CONF;

//打开错误堆栈信息打印
app.set('showStackError', true);
//开启view cache，提高生产环境模板渲染速度
app.set('view cache', true);

//设置视图层目录
// 生产环境
// app.set('views', path.join(__dirname, 'views', 'pages'));
// 开发环境
app.set('views', path.join(__dirname, 'public', 'templates', 'pages'));

// 生产请禁用
app.use('/public', express.static('public'));

//设置模板引擎
app.set('view engine', 'xtpl');

mongoose.Promise = global.Promise;
mongoose.connect(dburl, function(err) {
  if (err) {
    log.info('mongoose connect err:' + err);
  } else {
    log.info('mongoose connect success!!!');
  }
});

//设置session store
// app.use(session({
//   store: new SessionStore({
//     host: SESSION_STORE_CONF.HOST,
//     port: SESSION_STORE_CONF.PORT,
//     ttl: SESSION_STORE_CONF.TTL
//   }),
//   secret: 'pemass wechat',
//   resave: true,
//   saveUninitialized: false
// }));

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000 }));
app.use(cookieParser());

app.use(session({
  saveUninitialized: false,
  resave: true,
  secret: 'santel-secret',
  store: new mongoStore({
    url: dburl,
    collection: 'sessions'
  })
}))

//打开请求日志分析
app.use(morgan('dev'));

//引入路由配置
require('./config/routes')(app);

app.listen(port);

log.info('Example app listening on port ' + port + '!');
log.info('process.env.NODE_ENV=' + process.env.NODE_ENV);
