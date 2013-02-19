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
                         new OS.user.UserWin.Label({
                             winId:winId,
                             labelWinId:'userInfo',
                             data:{
                                'text':'用户基础信息',
                                'icon':'user-manager-icon'
                            }}),
                        new OS.user.UserWin.Label({
                            winId:winId,
                            labelWinId:'appInfo',
                            data:{
                             'text':'用户APP信息',
                             'icon':'user-manager-icon'
                        }})
                    ]
                }, {
                    region: 'center',
                    xtype: 'panel',
                    id:'detailId',
                    layout:'fit',
                    bodyStyle: {
                        background: '#dce9ff'
                    },
                    items: []
                }]
            });
        }
        me.setContextMenuTrue(win);
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
    constructor: function(cfg,win) {
        var me = this,cfg = cfg || {},
        winId= cfg.winId;
        me.labelWinId= cfg.labelWinId;
        me.callParent([Ext.apply({
                height: 20,
                width: 160,
                data:cfg.data,
                tpl:['<div style="height:20px;"><span class={icon} style="display: inline-block;"></span>{text}</div>'],
                listeners:{
                    'afterrender':function(me){
                        me.getEl().on('mouseenter',function(){
                            this.getEl().down('div').addCls('file-view-base-mouse');
                        },me)
                        me.getEl().on('mouseleave',function(){
                            this.getEl().down('div').removeCls('file-view-base-mouse');
                        },me)
                        me.getEl().on('click',function(){
                            me.getLabelWin(me.labelWinId,this,winId);
                        },me)
                    }
                }
            }, cfg)])
    },
    getLabelWin:function(labelWinId,win,winId){
        var detailWin = win.up().up().down('#detailId');
        detailWin.removeAll();
        if(labelWinId == 'userInfo'){
            var detail = new OS.user.UserWin.UserInfoPanel();
            detailWin.add(detail.getUserInfoPanel());
            detail.getSource(winId);
        }
        if(labelWinId == 'appInfo'){
            var detail = new OS.user.UserWin.APPInfoPanel(winId);
            detailWin.add(detail.getView());
        }

    }
})

Ext.define('OS.user.UserWin.UserInfoPanel',{

    getUserInfoPanel:function(cfg){
        cfg = cfg||{};
        var me = this;
        return me.panel ||(me.panel = Ext.create('Ext.grid.property.Grid', {
            title: cfg.title,
            propertyNames:{
                "name":"名称",
                "age":"年龄"
            },
            bodyStyle: {
                background: '#dce9ff'
            },
            source: {},
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: '保存',
                            iconCls:'add16',
                            handler:function(){me.save()}
                        },{
                            xtype:'button',
                            text:'增加信息',
                            iconCls:'add16',
                            handler:function(button){me.addPro(button)}
                        }
                    ]
                }
            ],
            listeners:{
                'afterrender':function(){
                    this.getEl().down('span:contains(名称)').update("用户属性");
                    this.getEl().down('span:contains(值)').update("用户数据");
                },
                'itemcontextmenu':function(view,record,item,index,e){
                    e.stopEvent();
                        config = {
                            items:[
                                { text: '删除当前属性', handler: function(){me.deletePro(record)}}
                            ]
                        };
                    var menu =  new Ext.menu.Menu(config);
                    menu.showAt(e.getXY());
                    menu.doConstrain();
                }
            }
        }));
    },
    getSource:function(objectid){
        var me = this;
        me.userId = objectid;
        Ext.Ajax.request({
            url:'/user/getUserInfoByQuery.do',
            params:{
                objectid:objectid,
                query:'userInfo'
            },
            success:function(req){
                me.panel.setSource(Ext.JSON.decode(req.responseText));
            }
        })
    },
    save:function(){
        var source = this.panel.getSource();
        var me = this;
        Ext.Ajax.request({
            url:'/user/update.do',
            params:{
                objectid :me.userId,
                updateStr : "userInfo",
                updateCon : Ext.JSON.encode(source)
            },
            success:function(){
                Ext.Msg.alert("提示","保存成功");
            }
        })
    },
    addPro:function(button){
       var grid = this.panel;
       var me = this;
       if(me.added){
           button.setText("增加信息");
           var name = me.add.down('.name').getValue(),
               value = me.add.down('.value').getValue();
           if(name == '' || value == '') {
               Ext.Msg.alert("提示","不能名称和信息都为空");
               return ;
           }
           grid.setProperty(this.add.down('.name').getValue(),
               this.add.down('.value').getValue(),true)
           me.added = false;
           me.add.remove();
       }else{
           button.setText("保存增加信息");
           me.add = grid.getEl().down('tbody').createChild('<tr class="x-grid-row ">' +
               '<td class="x-grid-property-name x-grid-cell x-grid-cell-name   x-grid-cell-first ">' +
               '<input class="name x-grid-cell-inner x-grid-cell x-grid-cell-name   "/>' +
               '<td class=" x-grid-cell x-grid-cell-value   x-grid-cell-last">' +
               '<input class="value x-grid-cell-inner x-grid-cell-value   x-grid-cell-last" style="text-align: left; ;"/>' +
               '<span style="float:right">取消</span>'+
               '</tr>')
           me.add.down('span').addClsOnOver('file-view-base-mouse').on('click',function(){
               me.add.remove();
               button.setText("增加信息");
               me.added = false;
           });
           me.added = true;
       }
    },
    deletePro : function(record){
        this.panel.removeProperty(record.get('name'))
    }
})

Ext.define('OS.user.UserWin.APPInfoPanel',{

    extend:'OS.fileView.FileView',

    constructor:function(winId){
        this.winId = winId;
        this.emptyText = "没有APP"
    },
    getStore:function(){
        var me = this;
        var store =  new Ext.data.Store({
            proxy:{
                type:'ajax',
                url:'/user/getUserInfoByQuery.do',
                extraParams: {
                    "objectid": this.winId,
                    "query": 'userApps'
                },
                actionMethods:{
                  'read':'POST'
                }
            },
            autoLoad:true,
            fields :[
                {name:'appDefaultName'},
                {name:'appIconCls'},
                { name:'src', type:'string' },
                { name:'caption', type:'string' }

            ],
            listeners:{
                'load':function(store,records){
                   me.initStore(records,'appDefaultName','appIconCls');
                }
            }

        });
        return store;
    },

    getItemContextMenu:function(record){
        var me = this,
            menu = new Ext.menu.Menu({
                items:[
                    { text: '卸载', handler: function(){me.deleteApp(record)}, scope: me },
                ]
            });
        return (me.menu = menu);
    },


    deleteApp:function(record){
        var me = this;
        me.getStore().remove(record);
    }
})