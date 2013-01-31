/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-28
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */

Ext.define('file.UserFile',{
    extend:'Ext.data.Model',
    requires:[
        'OS.user.UserWin'
    ],
    fields: [
        { name:'username', type:'string' },
        { name:'_id', type:'string' },
        { name:'src', type:'string' },
        { name:'caption',type:'string'}
    ],
    getUserWin:function(onwer,newfalg){
        var me = this;
        me.win = OS.user.UserWin.createWin(me,newfalg);
        onwer.addSubWins(me.win);
    },
    remove:function(callback){
         callback();
    }
})


Ext.define("OS.user.UserView",{
    extend:'OS.fileView.FileView',

    constructor:function(onwer){
        this.onwer = onwer;
        this.win = onwer.win;
        this.emptyText = "没有用户"
    },

    getStore:function(){
        var me = this;
        return me.store ||(me.store = Ext.create('Ext.data.Store',{
            model:'file.UserFile',
            proxy :{
                type:'ajax',
                url:'/user/getUserView.do'
            },
            autoLoad:true,
            listeners:{
                'load':function(store,records){
                    for(var i=0;i<records.length;i++ ){
                        var record  = records[i];
                        record.set('caption',record.get('username'));
                        record.set('src',me.default_view);
                    }
                }
            }
        }))
    },

    getItemContextMenu:function(record){
        var me = this,
            menu = new Ext.menu.Menu({
                items:[
                    { text: '查看', handler: function(){record.getUserWin(me.onwer)}, scope: me },
                    { text: '修改', handler: function(){record.getUserWin(me.onwer)}, scope: me },
                    { text: '删除', handler: function(){me.delete(record)}, scope: me }
                ]
            });
        return (me.menu = menu);
    },


    /**
     * 基本操作
     */
    delete:function(record){
        var me = this;
        Ext.Msg.show({
                title:'询问框',
                msg:"确认要删除用户:"+record.get('username')+"吗？",
                buttonText:{yes:'确认删除',no:'我点错了'},
                buttons:Ext.MessageBox.YESNO ,
                icon: Ext.MessageBox.QUESTION,
                fn:function(btn){
                    if(btn != 'yes') return ;
                    record.remove(function(){
                        me.getStore().remove(record);
                    })
                }
        })
    },
    /**
     * 增加
     */
    add:function(){
        var me = this,
            record = new file.UserFile();
        record.getUserWin(me.onwer,true);
    },
    /**
     * 双击动作动作 覆盖父类方法
     * @param view
     * @param record
     */
    itemDbClick:function(view,record){
        var me = this;
        record.getUserWin(me.onwer);
    }


})