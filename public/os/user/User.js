/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午3:13
 * To change this template use File | Settings | File Templates.
 * 用户控制前台
 *
 * 前天存取用户基本信息
 */


Ext.define('OS.user.User',{

    constructor: function (os) {
        this.os = os;
    },
    /**
     * app格式：
     * pageJson:{
     *   appId:'user-manager', --win Id 用来识别win
     *   appIconCls:'user-manager',--win Cls用来显示图标的
     *   appDefaultName:'用户管理',  --win 名称
     *   appClass:'OS.user.UserManager'--需要加载的app
     * }
     * @return {*}
     */
    getUserApps:function(){
        var apps = [];
        for(var i = 0 ; i <this.userApps.length;i++){
            var class_ = this.userApps[i].appClass;
            apps.push(Ext.create(class_));
        }
        return apps;
    },
    /**
     * 得到桌面图标
     * @param user
     * @return {*}
     */
    getShortcuts:function(){
        var shortcuts = [],apps= this.getApps();
        for(var i =0 ; i< apps.length ; i++){
            var shortcut = {};
            shortcut.name = apps[i].appName || apps[i].appDefaultName;
            shortcut.iconCls = apps[i].appIconCls;
            shortcut.module = apps[i].appId;
            shortcuts.push(shortcut);
        }
        return shortcuts;
    },
    /**
     * 得到用户APP信息
     * @return {*}
     */
    getApps:function(){
       return this.userApps;
    },
    statics:{
        //将用户初始化成Ext的用户
        initUser :function(os,user_){
            var user = new OS.user.User(os);
            for(var x in user_){
               if( user_.hasOwnProperty(x)){
                   user[x] = user_[x];
               }
            }
            return user;
        }
    }

})