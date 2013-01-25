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

    getUserApps:function(){
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