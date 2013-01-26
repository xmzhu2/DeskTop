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
//        'MyDesktop.SystemStatus',
//        'MyDesktop.VideoWindow',
//        'MyDesktop.GridWindow',
//        'MyDesktop.TabWindow',
//        'MyDesktop.AccordionWindow',
//        'MyDesktop.Notepad',
//        'MyDesktop.BogusMenuModule',
//        'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
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
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
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
        console.log(shortcuts);
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
            contextMenuItems: [
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
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
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
