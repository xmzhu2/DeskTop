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

    require:[
        'OS.keyMap.KeyMapPlugin'
    ],

    uses: [
        'Ext.util.MixedCollection',
        'Ext.menu.Menu'
    ],

    /**
     * 初始化信息
     */
    init:function(){
        this.launcher = {
            text: '用户管理',
            iconCls:'icon-grid'
        };
    },

    createWindow:function(){
        var me = this, appId = me.id;
            desktop = me.app.getDesktop(),
            win =me.win= desktop.getWindow('user-manager');
        if(!win){
            win = desktop.createWindow({
                id: 'user-manager',
                title:'用户管理',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                keyMaps:me.shortcuts,
                keyMapsScope:true,
                items: []
            });
        }
        me.setContextMenuTrue(win);
        win.owner = me;
        return win;
    },
    /**
     * 创建右键菜单
     * @return {Ext.menu.Menu}
     */
    createContextMenu:function(){
        var me=this,
            config = {
            items:[{ text: '测试右键', handler: me.Test, scope: me, minWindows: 1 }]
        };
        return new Ext.menu.Menu(config);
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
    },
    //Test
    Test :function(){
      Ext.Msg.alert("测试右键");
    }
})