/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-27
 * Time: 下午1:57
 * To change this template use File | Settings | File Templates.
 * 文件试图
 */

var default_view = "../../desktop/images/mrtx.png";
Ext.define('File', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'src', type:'string' },
        { name:'caption', type:'string' }
    ]
});



var imageTpl = new Ext.XTemplate(
    '<tpl for=".">',
    '<div class="file-view-base {bCls}">',
    '<div style="margin-bottom: 10px;" class="file-view-onwer {oCls}" >',
    '<img src="{src}" />',
    '<br/><span class="file-view-span {spanCls}" >{caption}</span>',
    '</div>',
    '</div>',
    '</tpl>'
);


Ext.define('OS.fileView.FileView',{
    default_view:default_view,
    getView:function(){
        var me = this,
            view = me.view = Ext.create('Ext.view.View', {
            store: me.getStore(),
            tpl: imageTpl,
            itemSelector: 'div.file-view-base',
            emptyText: 'Error'
        });
        return view;
    },

    getStore : function(){},
    getData:function(){}


})
