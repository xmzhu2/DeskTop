/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-22
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */


Ext.define("OS.appLoad.Load",{

//    requires:[
//        'MyDesktop.SystemStatus',
//        'MyDesktop.VideoWindow',
//        'MyDesktop.GridWindow',
//        'MyDesktop.TabWindow',
//        'MyDesktop.AccordionWindow',
//        'MyDesktop.Notepad',
//        'MyDesktop.BogusMenuModule',
//        'MyDesktop.BogusModule'
//
//    ],

    statics:{
        /**
         * 得到用户信息
         * @param user
         * @return {*}
         */
        getModules : function (user){
            if(user)
                return user.getUserApps();
            return [];
        },
        /**
         * 得到用户配置
         * @param user
         */
        getShortcuts:function(user){
            if(user)
                return user.getShortcuts();

        }
    }



})