/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-28
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */

Ext.define('file.UserFile',{
    extend:'Ext.data.Model',
    fields: [
        { name:'username', type:'string' },
        { name:'_id', type:'string' },
        { name:'src', type:'string' },
        { name:'caption',type:'string'}
    ]
})


Ext.define("OS.user.UserView",{
    extend:'OS.fileView.FileView',

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
    }

})