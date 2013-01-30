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
                id: 'user-win'+winId,
                title:'用户管理'+(("-"+username)||""),
                width:440,
                height:300,
                iconCls: 'user-manager-icon',
                animCollapse:false,
                constrainHeader:true,
                layout: {
                    type: 'border',
                    padding: 5
                },
                items: [{
                    region: 'west',
                    title: '导航',
                    width: 200,
                    split: true,
                    collapsible: true,
                    floatable: false,
                    items:[]
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
        createWin :function(model){
            userWin = new OS.user.UserWin();
            return userWin.createWindow(model.get('_id'),model.get('username'));
        }

    }
})