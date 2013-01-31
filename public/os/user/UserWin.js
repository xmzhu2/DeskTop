/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-29
 * Time: 下午3:09
 * To change this template use File | Settings | File Templates.
 * 用户窗口
 */



Ext.define('OS.user.UserWin',{
    extend:'Ext.ux.desktop.Module',

    init:function(){},

    createWindow:function(winId,username){
        var me = this,
            desktop =OS.OSApplication.desktop,
            win = desktop.getWindow('user-win'+winId);
            me.id= winId;
        if(!win){
            win = desktop.createWindow({
                id: 'user-win'+me.id,
                title:'用户管理'+(("-"+username)||""),
                width:540,
                height:400,
                iconCls: 'user-manager-icon',
                animCollapse:false,
                constrainHeader:true,
                keyMaps:me.getShortcuts(),
                keyMapsScope:true,
                layout: {
                    type: 'border',
                    padding: 5
                },
                items: [{
                    region: 'west',
                    title: '导航',
                    width: 160,
                    split: true,
                    collapsible: true,
                    floatable: false,
                    layout:'accordion',
                    defaults: {
                        bodyStyle: 'padding:5px'
                    },
                    items:[{
                        title:'用户基本信息',
                        items:[
                            {
                                border:0,
                                html:'tet'
                            }
                        ]
                    }]
                }, {
                    region: 'center',
                    xtype: 'tabpanel',
                    items: [{
                        title: 'Bogus Tab',
                        html: 'Hello world 1'
                    }, {
                        title: 'Another Tab',
                        html: 'Hello world 2'
                    }, {
                        title: 'Closable Tab',
                        html: 'Hello world 3',
                        closable: true
                    }]
                }]
            });
        }
     //   me.setContextMenuTrue(win);
        win.owner = me;
        win.show();
        me.win =win;
        return me;
    },

    getItems:function(){


    },


    doClose :function(){
      var me = this;
      me.win.close();
    },
    statics:{
        id:1,
        createWin :function(model,newfalg){
            if(newfalg){
                userWin = new OS.user.UserWin();
                return userWin.createWindow((OS.user.UserWin.id++),'新增');
            }
            userWin = new OS.user.UserWin();
            return userWin.createWindow(model.get('_id'),model.get('username'));
        }

    }
})