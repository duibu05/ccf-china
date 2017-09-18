const Qiniu = require('../controllers/Qiniu'),
  Index = require('../controllers/Index'),
  Setting = require('../controllers/Setting'),
  Banner = require('../controllers/Banner'),
  RecommandedAA = require('../controllers/RecommandedAA'),
  Contact = require('../controllers/Contact'),
  News = require('../controllers/News'),
  WhitePaper = require('../controllers/WhitePaper'),
  Application = require('../controllers/Application'),
  ApplicationArea = require('../controllers/ProductApplicationArea'),
  ApplicationAreaAdvantage = require('../controllers/ProductApplicationAreaAdvantage'),
  Product = require('../controllers/Product'),
  Solution = require('../controllers/Solution'),
  FaqCategory = require('../controllers/FaqCategory'),
  FriendLinkCategory = require('../controllers/FriendLinkCategory'),
  Faq = require('../controllers/Faq'),
  BigEvent = require('../controllers/BigEvent'),
  BigEventCategory = require('../controllers/BigEventCategory'),
  Company = require('../controllers/Company'),
  Authorization = require('../controllers/Authorization'),
  User = require('../controllers/User'),
  MiddleWares = require('../middlewares/auth.middleware');

module.exports = function(app) {

  app.get('/', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Index.index);

  app.get('/application-area/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, ApplicationArea.showAdvantages);

  app.get('/product/application-area-advantage/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Product.showRelationalProducts);
  app.get('/product/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Product.showProductDetails);
  app.get('/product/category/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Product.showProductsByCategory);

  app.get('/solution/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Solution.showSolutionDetails);

  app.get('/support', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchWhitePapers, MiddleWares.fetchApplications, MiddleWares.fetchBigEventCategories, Contact.contactHeadOffice);

  app.get('/contact', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Contact.show);

  app.get('/faq/category/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Faq.showFaqsByCategory);

  app.get('/big-event/category/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, BigEvent.showBigEventsByCategory);

  app.get('/company', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, Company.show);

  app.get('/news', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, News.show);
  app.get('/news/:id', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, News.showDetails);

  app.get('/friend-links', MiddleWares.loadSetting, MiddleWares.fetchApplicationAreas, MiddleWares.fetchSolutions, MiddleWares.fetchFaqCategories, MiddleWares.fetchBigEventCategories, FriendLinkCategory.showFriendLinks);

  app.post('/api/signin', Authorization.signin);
  app.get('/api/signout', MiddleWares.requireSignin, Authorization.signout);

  app.post('/api/user', MiddleWares.requireSignin, MiddleWares.requireSuperAdmin, User.addUser, MiddleWares.userModuleErrorHandler);
  app.get('/api/user', MiddleWares.requireSignin, MiddleWares.requireSuperAdmin, User.queryUsers, MiddleWares.userModuleErrorHandler);
  app.get('/api/user/:username', MiddleWares.requireSignin, User.findUser, MiddleWares.userModuleErrorHandler);
  app.put('/api/user/:username', MiddleWares.requireSignin, MiddleWares.requireSuperAdmin, User.updateUser, MiddleWares.userModuleErrorHandler);
  app.put('/api/user/:username/password', MiddleWares.requireSignin, MiddleWares.superAdminOrMyself, User.updatePassword, MiddleWares.userModuleErrorHandler);
  app.delete('/api/user/:username', MiddleWares.requireSignin, MiddleWares.requireSuperAdmin, User.delUser, MiddleWares.userModuleErrorHandler);

  app.post('/api/contact', MiddleWares.requireSignin, Contact.save);
  app.get('/api/contact', MiddleWares.requireSignin, Contact.query);
  app.get('/api/contact/headOffice', MiddleWares.requireSignin, Contact.queryHeadOffice);
  app.get('/api/contact/:id', MiddleWares.requireSignin, Contact.queryById);
  app.delete('/api/contact/:id', MiddleWares.requireSignin, Contact.delContact);

  app.post('/api/company', MiddleWares.requireSignin, Company.save);
  app.get('/api/company/:id', MiddleWares.requireSignin, Company.queryById);
  app.delete('/api/company/:id/important-date/:index', MiddleWares.requireSignin, Company.delImportantDate);
  app.delete('/api/company/:id/values/:index', MiddleWares.requireSignin, Company.delValues);

  app.get('/api/news/:id', MiddleWares.requireSignin, News.queryById);
  app.get('/api/news', MiddleWares.requireSignin, News.query);
  app.post('/api/news', MiddleWares.requireSignin, News.save);
  app.delete('/api/news/:id', MiddleWares.requireSignin, News.delNews);

  app.get('/api/white-paper/:id', MiddleWares.requireSignin, WhitePaper.queryById);
  app.get('/api/white-paper', MiddleWares.requireSignin, WhitePaper.query);
  app.post('/api/white-paper', MiddleWares.requireSignin, WhitePaper.save);
  app.put('/api/white-paper/:id', MiddleWares.requireSignin, WhitePaper.update);
  app.delete('/api/white-paper/:id', MiddleWares.requireSignin, WhitePaper.delWhitePaper);

  app.get('/api/application/:id', MiddleWares.requireSignin, Application.queryById);
  app.get('/api/application', MiddleWares.requireSignin, Application.query);
  app.post('/api/application', MiddleWares.requireSignin, Application.save);
  app.put('/api/application/:id', MiddleWares.requireSignin, Application.update);
  app.delete('/api/application/:id', MiddleWares.requireSignin, Application.del);

  app.get('/api/faq-category', MiddleWares.requireSignin, FaqCategory.query);
  app.get('/api/faq-category/:id', MiddleWares.requireSignin, FaqCategory.queryById);
  app.post('/api/faq-category', MiddleWares.requireSignin, FaqCategory.save);
  app.put('/api/faq-category/:id', MiddleWares.requireSignin, FaqCategory.update);
  app.delete('/api/faq-category/:id', MiddleWares.requireSignin, FaqCategory.del);

  app.get('/api/faq', MiddleWares.requireSignin, Faq.query);
  app.get('/api/faq/:id', MiddleWares.requireSignin, Faq.queryById);
  app.post('/api/faq', MiddleWares.requireSignin, Faq.save);
  app.put('/api/faq/:id', MiddleWares.requireSignin, Faq.update);
  app.delete('/api/faq/:id', MiddleWares.requireSignin, Faq.del);

  app.get('/api/big-event-category', MiddleWares.requireSignin, BigEventCategory.query);
  app.get('/api/big-event-category/:id', MiddleWares.requireSignin, BigEventCategory.queryById);
  app.post('/api/big-event-category', MiddleWares.requireSignin, BigEventCategory.save);
  app.put('/api/big-event-category/:id', MiddleWares.requireSignin, BigEventCategory.update);
  app.delete('/api/big-event-category/:id', MiddleWares.requireSignin, BigEventCategory.del);

  app.get('/api/big-event', MiddleWares.requireSignin, BigEvent.query);
  app.get('/api/big-event/:id', MiddleWares.requireSignin, BigEvent.queryById);
  app.post('/api/big-event', MiddleWares.requireSignin, BigEvent.save);
  app.put('/api/big-event/:id', MiddleWares.requireSignin, BigEvent.update);
  app.delete('/api/big-event/:id', MiddleWares.requireSignin, BigEvent.del);

  app.get('/api/application-area', MiddleWares.requireSignin, ApplicationArea.query);
  app.get('/api/application-area/:id', MiddleWares.requireSignin, ApplicationArea.queryById);
  app.post('/api/application-area', MiddleWares.requireSignin, ApplicationArea.save);
  app.put('/api/application-area/:id/:index', MiddleWares.requireSignin, ApplicationArea.updateCategory);
  app.put('/api/application-area/:id', MiddleWares.requireSignin, ApplicationArea.update);
  app.delete('/api/application-area/:id/:index', MiddleWares.requireSignin, ApplicationArea.delCategory);
  app.delete('/api/application-area/:id', MiddleWares.requireSignin, ApplicationArea.del);

  app.get('/api/product/category/:id', MiddleWares.requireSignin, Product.queryByCategoryId);
  app.get('/api/product/application-area/:id', MiddleWares.requireSignin, Product.queryByApplicationAreaId);
  app.get('/api/product/:id', MiddleWares.requireSignin, Product.queryById);
  app.post('/api/product', MiddleWares.requireSignin, Product.save);
  app.post('/api/product/advantage', MiddleWares.requireSignin, Product.saveAdvantage);
  app.post('/api/product/tech-spec', MiddleWares.requireSignin, Product.saveTechSpec);
  app.put('/api/product/:id', MiddleWares.requireSignin, Product.update);
  app.put('/api/product/advantage/:index', MiddleWares.requireSignin, Product.updateAdvantage);
  app.put('/api/product/tech-spec/:index', MiddleWares.requireSignin, Product.updateTechSpec);
  app.delete('/api/product/advantage/:id/:index', MiddleWares.requireSignin, Product.delAdvantage);
  app.delete('/api/product/tech-spec/:id/:index', MiddleWares.requireSignin, Product.delTechSpec);
  app.delete('/api/product/:id', MiddleWares.requireSignin, Product.del);

  app.get('/api/solution/category/:id', MiddleWares.requireSignin, Solution.queryByCategoryId);
  app.get('/api/solution/application-area/:id', MiddleWares.requireSignin, Solution.queryByApplicationAreaId);
  app.get('/api/solution/:id', MiddleWares.requireSignin, Solution.queryById);
  app.post('/api/solution', MiddleWares.requireSignin, Solution.save);
  app.post('/api/solution/advantage', MiddleWares.requireSignin, Solution.saveAdvantage);
  app.post('/api/solution/tech-spec', MiddleWares.requireSignin, Solution.saveTechSpec);
  app.put('/api/solution/:id', MiddleWares.requireSignin, Solution.update);
  app.put('/api/solution/advantage/:index', MiddleWares.requireSignin, Solution.updateAdvantage);
  app.put('/api/solution/tech-spec/:index', MiddleWares.requireSignin, Solution.updateTechSpec);
  app.delete('/api/solution/advantage/:id/:index', MiddleWares.requireSignin, Solution.delAdvantage);
  app.delete('/api/solution/tech-spec/:id/:index', MiddleWares.requireSignin, Solution.delTechSpec);
  app.delete('/api/solution/:id', MiddleWares.requireSignin, Solution.del);

  app.get('/api/application-area-advantage/application-area/:applicationAreaId', MiddleWares.requireSignin, ApplicationAreaAdvantage.queryByApplicationAreaId);
  app.get('/api/application-area-advantage/:id', MiddleWares.requireSignin, ApplicationAreaAdvantage.queryById);
  app.post('/api/application-area-advantage', MiddleWares.requireSignin, ApplicationAreaAdvantage.save);
  app.put('/api/application-area-advantage/:id', MiddleWares.requireSignin, ApplicationAreaAdvantage.update);
  app.delete('/api/application-area-advantage/:id', MiddleWares.requireSignin, ApplicationAreaAdvantage.del);

  app.get('/api/banner', MiddleWares.requireSignin, Banner.query);
  app.get('/api/banner/:id', MiddleWares.requireSignin, Banner.queryById);
  app.post('/api/banner', MiddleWares.requireSignin, Banner.save);
  app.put('/api/banner/:id', MiddleWares.requireSignin, Banner.update);
  app.delete('/api/banner/:id', MiddleWares.requireSignin, Banner.del);

  app.get('/api/website-setting', MiddleWares.requireSignin, Setting.queryOne);
  app.post('/api/website-setting', MiddleWares.requireSignin, Setting.save);

  app.get('/api/recommanded-aa', MiddleWares.requireSignin, RecommandedAA.query);
  app.get('/api/recommanded-aa/:id', MiddleWares.requireSignin, RecommandedAA.queryById);
  app.post('/api/recommanded-aa', MiddleWares.requireSignin, RecommandedAA.save);
  app.put('/api/recommanded-aa/:id', MiddleWares.requireSignin, RecommandedAA.update);
  app.delete('/api/recommanded-aa/:id', MiddleWares.requireSignin, RecommandedAA.del);

  app.get('/api/friend-link-category', MiddleWares.requireSignin, FriendLinkCategory.query);
  app.get('/api/friend-link-category/:id', MiddleWares.requireSignin, FriendLinkCategory.queryById);
  app.post('/api/friend-link-category', MiddleWares.requireSignin, FriendLinkCategory.save);
  app.put('/api/friend-link-category/:id', MiddleWares.requireSignin, FriendLinkCategory.update);
  app.put('/api/friend-link-category/:id/:index', MiddleWares.requireSignin, FriendLinkCategory.updateLink);
  app.delete('/api/friend-link-category/:id', MiddleWares.requireSignin, FriendLinkCategory.del);
  app.delete('/api/friend-link-category/:id/:index', MiddleWares.requireSignin, FriendLinkCategory.delLink);

  app.get('/api/qiniu-uptoken', MiddleWares.requireSignin, Qiniu.uptoken);

}
