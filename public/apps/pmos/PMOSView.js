/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-2-19
 * Time: 下午5:26
 * To change this template use File | Settings | File Templates.
 */


var img = {
    'fwgl':'apps/pmos/imgs/fwgl.png'
}

Ext.define('PMOS.APPFile',{
    extend:'Ext.data.Model',
    fields:  [
        { name:'name', type:'string' },
        { name:'_id', type:'string' },
        { name:'app', type:'string' },
        { name:'appClass', type:'string' },
        { name:'src', type:'string' },
        { name:'caption',type:'string'}
    ],
    getWin:function(onwer,newfalg){
        var me = this;
        if(!me.app){
            me.app = Ext.create(me.get('appClass'));
        }
        onwer.addSubWins(me.app.createWindow().win);

    }
})


Ext.define('PMOS.PMOSView',{
    extend:'OS.fileView.FileView',

    constructor:function(onwer){
        this.onwer = onwer;
        this.win = onwer.win;
        this.emptyText = "没有权限"
    },

    getStore:function(){
        var me = this;
        return me.store ||(me.store = Ext.create('Ext.data.Store',{
            model :'PMOS.APPFile',
            data : [
                {caption: '住房管理', 'src':img.fwgl,_id: 'building-management',appClass:'PMOS.win.BuildingManagement'}
            ]
        }))
    },

    getItemContextMenu:function(record){
        var me = this,
            menu = new Ext.menu.Menu({
                items:[
                    { text: '查看', handler: function(){record.getUserWin(me.onwer)}, scope: me },
                    { text: '编辑', handler: function(){record.getUserWin(me.onwer)}, scope: me }
                ]
            });
        return (me.menu = menu);
    },

    /**
     * 双击动作动作 覆盖父类方法
     * @param view
     * @param record
     */
    itemDbClick:function(view,record){
        var me = this;
        record.getWin(me.onwer);
    }

})