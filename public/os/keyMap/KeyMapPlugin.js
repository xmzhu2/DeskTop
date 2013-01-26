/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-26
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 *
 * 键盘监听插件
 */

var console_text = "console path:OS.keyMap.KeyMapPlugin ;console context : ";

Ext.define('OS.keyMap.KeyMapPlugin',{

    init:function(win){
       // console.log(console_text + me);
        var keyMap = OS.keyMap.KeyMapPlugin;
        win.onRender = Ext.Function.createSequence(win.onRender,keyMap.add);
    },
    statics :{
        keyMap:{},

        //增加键盘监听
        add:function(){
            //console.log(console_text+ me.keyMap);
            var me = this;
            delete me.onRender;
            var keyMap = OS.keyMap.KeyMapPlugin;
            if(!me.keyMaps) return ;
            if(me.keyMapsScope) keyMap.setScope(me.keyMaps,me);
            var map = new Ext.KeyMap(me.getEl(), me.keyMaps);
            keyMap.keyMap[me.id] = map;

        },
        setScope:function(keyMaps,scope){
            for(var i = 0 ; i < keyMaps.length; i ++){
                if(!keyMaps[i].scope){
                    keyMaps[i].scope = scope;
                }
            }
        }

    }
})