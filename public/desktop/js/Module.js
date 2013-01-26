/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.Module', {

    mixins: {
        observable: 'Ext.util.Observable'
    },

    users:[
        'OS.keyMap.KeyMap'
    ],

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
    },

    init: Ext.emptyFn,

    /**
     * 右键菜单
     * @param e
     */
    onModuleMenu:function(e){
        var me = this, menu = this.getModuleContextMenu();
        e.stopEvent();
        menu.showAt(e.getXY());
        menu.doConstrain();
    },
    getModuleContextMenu:function(){
        var me = this;
        if(!me.contextMenu){
            me.contextMenu = me.createContextMenu();
        }
        return me.contextMenu;
    },
    createContextMenu:function(){return null},

    afterRander:function(win,contextMenuFlag){
        var me = this;
        if(contextMenuFlag) win.el.on('contextmenu',me.onModuleMenu,me);
    },
    /**
     * 是否启用右键菜单
     * 是否启用键盘监听（快捷键）
     * @param win
     */
    setContextMenuTrue:function(win,contextMenuFlag,keyMapFlag){
        var me = this;
        win.on('afterrender',me.afterRander,me,win,contextMenuFlag||true);
    }



});
