/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-27
 * Time: 下午1:57
 * To change this template use File | Settings | File Templates.
 * 文件试图
 */

var default_view = "../../desktop/images/mrtx.png";

var defalt_views = {
    'user-manager':'../../desktop/images/lxr.png'

}


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
    default_src : { name:'src', type:'string' },
    default_caption:{ name:'caption', type:'string' },
    getView:function(cfg){
        cfg = cfg || {};
        var me = this,
            store = me.store = me.getStore(),
            view = me.view = Ext.create('Ext.view.View', {
            store:store,
            tpl: me.tpl || imageTpl,
            autoScroll : true,
            itemSelector:me.selector_ || 'div.file-view-base',
            emptyText: me.emptyText|| 'Error',
            listeners:{
                render : (cfg.isDrag)?me.initDrag:Ext.emptyFn,
                'itemclick':me.getEventFn('itemClick'),
                'itemdblclick':me.getEventFn('itemDbClick'),
                'click':me.getEventFn('click'),
                'containerclick':me.getEventFn('containerClick'),
                'itemcontextmenu':me.getEventFn('itemContextMenu'),
                'itemmouseenter':me.getEventFn('itemMouseEnter'),
                'itemmouseleave':me.getEventFn('itemMouseLeaMve')
            }
        });
        return view;
    },

    getStore : function(){},
    getData:function(){},
    getItemContextMenu:function(){return null},

    initStore:function(records,caption,src){
        var me = this;
        for(var i=0;i<records.length;i++ ){
            var record  = records[i];
            record.set('caption',record.get(caption));
            record.set('src',defalt_views[record.get(src)]||me.default_view);
        }
    },

    /**
     * 事件
     */
    getEventFn:function(eventName){
        var me = this;
        return function(view,record,item,index,e){
            me[eventName](view,record,item,index,e);
        }
    },

    /**
     * 子类需要覆盖的属性
     * 覆盖之后对应相对事件，this指向当前
     * 参数：
     * view 当前视图对象
     * record  数据model
     * item html对象
     * index
     * e event 事件
     */
    //单机事件
    itemClick:function(view,record,item){
      var me = this;
      if(me.select) Ext.get(me.select).removeCls('file-view-base-select');
      me.select = item;
      Ext.get(me.select).addCls('file-view-base-select')
    },
    //双击事件
    itemDbClick:Ext.emptyFn(),

    //容器单击
    containerClick:function(){
        var me = this;
        if(me.select) Ext.get(me.select).removeCls('file-view-base-select');
    },

    itemMouseEnter:function(view,record,item){
        var me = this;
        Ext.get(item).addCls('file-view-base-mouse');
    },
    itemMouseLeaMve:function(view,record,item){
        var me = this;
        Ext.get(item).removeCls('file-view-base-mouse');
    },

    //右击事件
    itemContextMenu:function(view,record,item,index,e){
        var me = this,menu = me.getItemContextMenu(record);
        if(me.select) Ext.get(me.select).removeCls('file-view-base-select');
        me.select = item;
        Ext.get(me.select).addCls('file-view-base-select')
        if(menu != null){
            e.stopEvent();
            menu.showAt(e.getXY());
            menu.doConstrain();
        }
    },


    /**
     * 拖拽init
     */
    initDrag :function(v) {
        v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

            getDragData: function(e) {
                var sourceEl = e.getTarget(v.itemSelector, 10), d;
                if (sourceEl) {
                    d = sourceEl.cloneNode(true);
                    d.id = Ext.id();
                    return v.dragData = {
                        sourceEl: sourceEl,
                        repairXY: Ext.fly(sourceEl).getXY(),
                        ddel: d,
                        patientData: v.getRecord(sourceEl).data
                    };
                }
            },
            getRepairXY: function() {
                return this.dragData.repairXY;
            }
    });
}

})
