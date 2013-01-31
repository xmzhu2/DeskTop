/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-25
 * Time: 下午7:40
 * To change this template use File | Settings | File Templates.
 * 用户管理
 */

Ext.define('OS.user.UserManager',{

    extend:'Ext.ux.desktop.Module',

    id:'user-manager',

    requires:[
        'OS.keyMap.KeyMapPlugin',
        'OS.user.UserView'
    ],

    /**
     * 初始化信息
     */
    init:function(){
        this.launcher = {
            text: '用户管理',
            iconCls:'user-manager-icon'
        };
    },

    createWindow:function(){
        var me = this, appId = me.id,
            desktop = me.app.getDesktop(),
            win = desktop.getWindow('user-manager');
        if(!win){
            var view = me.createWindowView();
            win = desktop.createWindow({
                id: 'user-manager',
                title:'用户管理',
                width:740,
                height:480,
                iconCls: 'user-manager-icon',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                keyMaps:me.getShortcuts(),
                keyMapsScope:true,
                items: [view.getView()]
            });
        }
        me.setContextMenuTrue(win);
        me.setSubWinsClosedOnClose(win);
        win.owner = me;
        me.win = win
        return win;
    },

    /**
     * 创建试图
     * @return {*}
     */
    createWindowView:function(){
       var me = this;
           me.view = me.view||(new OS.user.UserView(me));
       // me.view.getStore();
        return me.view;
    },
    /**
     * 创建右键菜单
     * @return {Ext.menu.Menu}
     */
    createContextMenu:function(){
        var me=this,
            config = {
            items:[
                { text: '增加', handler: me.add, scope: me, minWindows: 1 },
                { text: '批量删除', handler: function(){alert('测试右键')}, scope: me, minWindows: 1 },
                { text: '测试右键', handler: function(){alert('测试右键')}, scope: me, minWindows: 1 }
            ]
        };
        return new Ext.menu.Menu(config);
    },

    /**
     *
     */
    add:function(){
        var me = this;
        if(me.view){
            me.view.add();
        }
    },

    /**
     *所有快捷键方法保存在 一下对象中
     */
    shortcuts:[
        {key:'d',handler:function(){alert(this.owner.id)}}
    ],

    /**
     * 用于存放在DB中的app信息
     * 固定格式
     */
    pageJson:{
        appId:'user-manager',
        appIconCls:'user-manager',
        appDefaultName:'用户管理',
        appClass:'OS.user.UserManager'
    }

})
