/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-2-19
 * Time: 下午4:52
 * To change this template use File | Settings | File Templates.
 */

Ext.define("PMOS.PMOSApp",{

    extend:'Ext.ux.desktop.Module',

    id:'pmos-manager',

    requires:[
        'OS.keyMap.KeyMapPlugin',
        'PMOS.PMOSView'
    ],
    /**
     * 初始化信息
     */
    init:function(){
    },

    createWindow:function(){
        var me = this, appId = me.id,
            desktop = me.app.getDesktop(),
            win = desktop.getWindow('pmos-manager');
        if(!win){
            var view = me.createWindowView();
            win = desktop.createWindow({
                id: 'pmos-manager',
                title:'物业管理系统',
                width:740,
                height:480,
                bodyStyle: {
                    background: '#dce9ff'
                },
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
        me.view = me.view||(new PMOS.PMOSView(me));
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
                    { text: '属性', handler: me.settings, scope: me, minWindows: 1 }
                ]
            };
        return new Ext.menu.Menu(config);
    },

    /**
     *
     */
    settings:function(){
        Ext.Msg.alert("提示","其实神马也木有。。")
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
        appId:'pmos-manager',
        appIconCls:'pmos-manager',
        appDefaultName:'物业管理系统',
        appClass:'PMOS.PMOSApp'
    }

})