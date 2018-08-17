'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import controllerInit from './controllers'
_log4js2.default.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
const app = new _koa2.default();
//创建IOC容器
const container = (0, _awilix.createContainer)();
//每一次请求与都是new一次类
app.use((0, _awilixKoa.scopePerRequest)(container));
//装载service
container.loadModules([__dirname + '/service/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});
//设置模板
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
}));

_errorHandler2.default.error(app, logger);
//自动注册所有路由
app.use((0, _awilixKoa.loadControllers)('controllers/*.js', { cwd: __dirname }));
// controllerInit(app,router);
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
  console.log(`server is ${_config2.default.port}`);
});