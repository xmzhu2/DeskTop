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
                bodyStyle:{
                    background:'#ecf0ff'
                },
                items: [{
                    region: 'west',
                    title: '导航',
                    width: 160,
                    split: true,
                    collapsible: true,
                    xtype:'panel',
                    bodyStyle: {
                        background: '#dce9ff'
                    },
                    frame:true,
                    items: [
                         new OS.user.UserWin.Label({data:{
                            'text':'用户基础信息',
                            'icon':'user-manager-icon'
                        }}),new OS.user.UserWin.Label({data:{
                            'text':'用户APP信息',
                            'icon':'user-manager-icon'
                        }})
                    ]
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
            userWin.model = model;
            return userWin.createWindow(model.get('_id'),model.get('username'));
        }

    }
})


Ext.define('OS.user.UserWin.Label',{
    'extend':'Ext.form.Label',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                height: 20,
                width: 160,
                data:cfg.data,
                tpl:['<div><span class={icon} style="display: inline-block;"></span>{text}</div>'],
                listeners:{
                    'afterrender':function(me){
                        me.getEl().on('mouseenter',function(){
                            this.getEl().down('div').addCls('file-view-base-mouse');
                        },me)
                        me.getEl().on('mouseleave',function(){
                            this.getEl().down('div').removeCls('file-view-base-mouse');
                        },me)
                        me.getEl().on('click',function(){
                            alert(1);
                        },me)
                    }
                }
            }, cfg)])
    }
})