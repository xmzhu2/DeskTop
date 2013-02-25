/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-2-20
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */


Ext.define('PMOS.win.BuildingManagement',{

    extend:'Ext.ux.desktop.Module',

    id:'building-management',

    init:function(){},

    createWindow:function(){
        var me = this;
            desktop =OS.OSApplication.desktop,
            win = desktop.getWindow(me.id);

        if(!win){
            me.treePanel = Ext.create('PMOS.win.BuildingManagement-Tree');
            win = desktop.createWindow({
                id: me.id,
                title:'房屋管理',
                width:900,
                height:450,
                iconCls: 'user-manager-icon',
                animCollapse:false,
                constrainHeader:true,
                keyMaps:me.getShortcuts(),
                keyMapsScope:true,
                layout:'border',
                defaults: {
                   //collapsible: true,
                    split: true
                   // bodyStyle: 'padding:15px'
                },
                dockedItems: [
                    Ext.create('PMOS.win.BuildingManagement-Toolbar')
                ],
                items: [me.treePanel.getTreePanel(),{
                    title: '信息信息',
                    collapsible: false,
                    region:'center'
                }]

            })
        }
        me.setContextMenuTrue(win);
        win.owner = me;
        win.show();
        me.win =win;
        return me;
    }
})

Ext.define('PMOS.win.BuildingManagement-Tree',{
    getTreePanel:function(){
        var me = this;
        return this.treePanel || (this.treePanel =  Ext.create('Ext.tree.Panel', {
            title: '小区房屋',
            region:'west',
            cmargins: '0 5 0 0',
            width: 175,
            minSize: 100,
            maxSize: 250,
            store: me.getTreeStore(),
            rootVisible: false
        }))
    },

    getTreeStore:function(){
        return this.treeStore||(this.treeStore =  Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    { text: "detention", leaf: true },
                    { text: "homework", expanded: true, children: [
                        { text: "book report", leaf: true },
                        { text: "alegrbra", leaf: true}
                    ] },
                    { text: "buy lottery tickets", leaf: true }
                ]
            }
        }))
    }


})

Ext.define('PMOS.win.BuildingManagement-Toolbar', {
    extend: 'Ext.toolbar.Toolbar',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    text: '统计',
                    width:60
                },
                {
                    xtype: 'splitbutton',
                    text: '查询',
                    width:60,
                    handler:function(){alert(5)},
                    menu:{
                        xtype:'menu',
                        items:[
                            '<h4>输入房号快速查询</h4>','-',{

                        }]
                    }
                },
                {
                    text:'操作',
                    showText: true,
                    width:60,
                    menu: {
                        xtype: 'menu',
                        width: 120,
                        items: [
                            {
                                text: '新建'
                            },
                            {
                                text: '编辑'
                            },
                            {
                                text: '删除'
                            }
                        ]
                    }
                }
            ]
        });

        me.callParent(arguments);
    }


});