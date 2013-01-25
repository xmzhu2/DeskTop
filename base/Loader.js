/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午4:31
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs')
  , path = require('path')
  , url = require('url');

module.exports  ={
    loadModel : function(){

    },
    /**
     * @param root
     * 加载当前系统所需要的路由
     * 根目录为root
     */
    loadSysRoute:function(root){
        var me = this;
        root = root ||global.SysControllerRoot || __dirname + '/../controller1';
        var files = fs.readdirSync(root);
        files.forEach(function(file){
            var path = root + '/' + file,
                stat = fs.lstatSync(path);

            if (!stat.isDirectory()){
                  if(file.split('.')[1] == 'router'){
                      require(path).loadRouter(me.app);
                      console.log(file);
                  }

            } else {
                me.loadSysRoute(path);
            }

        })
    },
    loadConfig : function(){

        require('../config/config');
        require('./DBUtil');
        require('./Base');
    },
    setStaticLoad:function(is){
        if(is){
            var app = this.app
               ,root = global.Static;
            //重定向静态文件 html,css,js,jpg,png => /static/+req.url
            app.all('/*.(html|css|js|jpg|png){1}', function(req, res, next){
                //var static_file_formats = ['.html','.css','.js','.jpg','.png'];
                //console.log(path.extname(req.url));
                var realpath = root + url.parse(req.url).pathname;
                console.log(realpath);
                //console.log(realpath);
                if(path.existsSync(realpath)){
                    res.end(fs.readFileSync(realpath));
                }else{
                    res.end('Cannot find request url: '+req.url);
                }
            });

        }

    }
}