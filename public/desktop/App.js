/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'OS.appLoad.Load',
        'OS.dock.Dock',

        'MyDesktop.Settings'
    ],
    /**
     * 构造方法
     * @param os
     */
    constructor:function(os){
        this.os = os;
        //放在后面
        this.callParent();
    },

    init: function() {
        this.callParent();
        //初始化DOCK
        this.getDock().init();
    },
    /**
     * 得到用户模块
     * @return {*}
     */
    getModules : function(){
        var me = this;
        if(!me.os)
            return null;
        return OS.appLoad.Load.getModules(me.os.user);
    },
    /**
     * 得到用户配置信息
     * @return {*}
     */
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
        var shortcuts = OS.appLoad.Load.getShortcuts(me.os.user);
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
            contextMenuItems: [
                {text:'DOCK设置',handler:me.onDockSettings,scope : me},
                '-',
                { text: '属性', handler: me.onSettings, scope: me }

            ],
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: shortcuts
            }),

            wallpaper: 'desktop/wallpapers/Sky.jpg',
            wallpaperStretch: true
        });
    },

    getDock : function(){
        return this.dock || (this.dock = new OS.dock.Dock());
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'退出',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('退出', '确定要退出吗?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
