/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-19
 * Time: 下午4:19
 * To change this template use File | Settings | File Templates.
 *
 * 登陆页面的路由执行动作
 */

/**
 * 首页登陆地址
 * @type {String}
 */
var index_path = '/index.do',
    login_path = '/user/login.do';

/**
 * 首页登陆
 * @param req
 * @param res
 */
exports.index = function(req,res){
    //如果session里面存在用户就把用户信息带出去
    var user = (req.session.user)?req.session.user:null;
    var appStr = " ";
    if(user){
        var apps = user[0].userApps;
        for(var i = 0 ; i < apps.length;i++){
            appStr = "'"+apps[i].appClass+"',"
        }
    }
    res.render('index.html',{app:appStr.substr(0,appStr.length-1),'user':global.base.ejsToJSON(user)});
}


/**
 * 路由过滤，权限控制。
 * @param req
 * @param res
 * @param next
 */
exports.filter = function(req,res,next){
    //设置所有访问url .do的都是后台请求服务
    //如果session中有用户，或者访问的URL是登陆动作，或者是首页动作，就可以继续访问
    if(req.url.indexOf('.do') == -1){
        next();
    }else if(req.session.user || req.url ==index_path || req.url == login_path){
        next();
    }else{
        res.redirect(index_path);
    }

}