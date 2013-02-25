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

    desktop:null,

    subWins:{},

    /**
     * 右键菜单
     * @param e
     */
    onModuleMenu:function(e){
        var me = this, menu =me.contextMenu||(me.contextMenu = me.createContextMenu());
        e.stopEvent();
        if(!menu) return;
        menu.showAt(e.getXY());
        menu.doConstrain();
    },

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
     * 创建快捷键
     * @return {*}
     */
    getShortcuts:function(){
        var me = this;
        return (me.shortcuts)?me.shortcuts.concat(me.subShortcuts)
            :me.subShortcuts;
    },


    /**
     *增加子窗口（子窗口是随父窗口关闭而关闭的）
     * @param win
     */
    addSubWins:function(win){
        var me = this;
        if(! me.subWins[me.id])  me.subWins[me.id]  = [];
        me.subWins[me.id].push(win);
    },
    /**
     * 子窗口关闭
     */
    sunWinClose:function(){
        var me = this,subWins = me.subWins[me.id];
        if(!subWins) return;
        for(var i = 0 ; i < subWins.length ; i++){
            subWins[i].doClose();
        }
    },


    /**
     * 基础属性
     */
      subShortcuts:[] ,
//    subShortcuts:[{
//        /**
//         *ctrl+enter
//         *效果：最大化
//         */
//        key:13,
//        ctrl:true,
//        fn:function(){
//            var me = this;
//            if(me.maximized){
//                me.restore().maximized = false;
//            }else{
//                me.maximize().maximized = true;
//            }
//        }
//    },{
//        /**
//         * alt+enter
//         * 效果：最小化
//         */
//        key:13,
//        alt:true,
//        fn:function(){
//            var me = this;
//            if(me.minimized){
//
//            }else{
//                me.minimize().minimized = true;
//            }
//        }
//    },{
//        /**
//         * alt+q
//         * 效果：快速推出
//         */
//        key:'q',
//        alt:true,
//        fn:function(){
//            var me = this;
//            me.close();
//        }
//    }],

    /**
     * 需要子类覆盖的方法
     */
    //右键菜单
    createContextMenu:function(){return null}

});
