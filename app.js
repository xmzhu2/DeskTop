
/**
 * Module dependencies.
 * 入口
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , url = require('url')
  , load = require('./base/Loader');


var app = express();
//可以在ejs里面使用html
app.engine('html', require('ejs').renderFile);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

    //路由加载模块
    load.app = app;
    //加载配置信息
    load.loadConfig();
    //加载系统需求路由
    load.loadSysRoute();
    //加载静态文件
    load.setStaticLoad(true);


app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
