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

    subWins:[],

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
    },
    /**
     * 设置是否子窗口更随父类窗口关闭
     * @param win
     */
    setSubWinsClosedOnClose:function(win){
        var me = this;
        win.on('beforedestroy',me.sunWinClose,me);
    },

    /**
     *增加子窗口（子窗口是随父窗口关闭而关闭的）
     * @param win
     */
    addSubWins:function(win){
        this.subWins.push(win);
    },
    /**
     * 子窗口关闭
     */
    sunWinClose:function(){
        var me = this;
        for(var i = 0 ; i < me.subWins.length ; i++){
            me.subWins[i].doClose();
        }
    }

});
