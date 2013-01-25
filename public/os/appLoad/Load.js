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
        getModules : function (user){
            if(user)
                return user.getUserApps();
            return [
                new MyDesktop.VideoWindow(),
                //new MyDesktop.Blockalanche(),
                new MyDesktop.SystemStatus(),
                new MyDesktop.GridWindow(),
                new MyDesktop.TabWindow(),
                new MyDesktop.AccordionWindow(),
                new MyDesktop.Notepad(),
                new MyDesktop.BogusMenuModule(),
                new MyDesktop.BogusModule()
            ];
        },
        getDesktopConfig:function(user){
            Ext.Ajax.request({


            })

        }
    }



})