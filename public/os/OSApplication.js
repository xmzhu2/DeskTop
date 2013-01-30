/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午3:18
 * To change this template use File | Settings | File Templates.
 */


Ext.define('OS.OSApplication',{

    requires:[
        'MyDesktop.App',
        'OS.user.User'
    ],
    /**
     * 登陆动作
     * @param username 用户名
     * @param password 密码
     * @param callback 登陆成功动作
     * @param scorp    函数作用于
     */
    login:function(username,password,callback,scorp){
        var me = this;
        Ext.Ajax.request({
            url: '/user/login.do',
            params: {
                "username": username,
                "password": password
            },
            success: function(res){
                var user =Ext.JSON.decode(res.responseText,true);
                me.initDesk(user[0]);
                callback(scorp);
            },
            failure:function(res){
                callback(scorp,false);
            }
        });

    },

    /**
     * 初始化页面
     */
    initDesk : function(user){
        var me = this;
        user = OS.user.User.initUser(me,user);
        me.user = user;
        me.app = new MyDesktop.App(me);
        OS.OSApplication.os = me;
        OS.OSApplication.app = me.app;
        OS.OSApplication.desktop = me.app.desktop;
    },

    statics:{
        os:null,
        app:null,
        desktop:null
    }

})