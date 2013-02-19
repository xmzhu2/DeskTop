/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-2-19
 * Time: 上午9:12
 * To change this template use File | Settings | File Templates.
 */



var default_view1 = "../../desktop/images/lxr.png";

var dockTpl = new Ext.XTemplate(
    '<tpl for=".">',
    '<div class="dock-view-base {bCls}">',
    '<div style="margin-bottom: 10px;" class="dock-view-onwer {oCls}" >',
    '<img src="{src}" width ="64px"/>',
    '</div>',
    '</div>',
    '</tpl>'
);

Ext.define('dock.DockFile',{
    extend:'Ext.data.Model',
    fields: [
        { name:'username', type:'string' },
        { name:'_id', type:'string' },
        { name:'src', type:'string' },
        { name:'caption',type:'string'}
    ]
});

Ext.define('OS.dock.DockView',{
    extend:'OS.fileView.FileView',

    tpl:dockTpl,
    selector_:'div.dock-view-base',

    getStore:function(){
        var me = this;
        return me.store ||(me.store = Ext.create('Ext.data.Store',{
            model:'dock.DockFile',
            proxy :{
                type:'ajax',
                url:'/user/getUserView.do'
            },
            autoLoad:true,
            listeners:{
                'load':function(store,records){
                    for(var i=0;i<records.length;i++ ){
                        var record  = records[i];
                        record.set('src',default_view1);
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
     * 双击动作动作 覆盖父类方法
     * @param view
     * @param record
     */
    itemDbClick:function(view,record){
        var me = this;
        record.getUserWin(me.onwer);
    }
})


Ext.define('OS.dock.Dock',{

    tpl : '<div id="my-dock-top" class="my-dock-top"><div id="my-dock" class="my-dock"></div></div>',

    /**
     * 方向 左 右 （上）
     * -1 - 左，
     * 1  - 右，
     * 0 -上
     */
    direction:0,
    /**
     * 当前状态 展开还是收起
     */
    state : -1,

    init:function(){
        var dh = Ext.DomHelper;
        this.dockDom = dh.append(Ext.getBody(),this.tpl,true);
        this.initDom();
    },
    initDom:function(){
        var me = this; dock = me.dockDom;
        me.initSize();
        dock.on('mouseover',me.mouseOver,me);
        dock.on('mouseleave',me.mouseLeave,me);
        me.initView();
        me.initDropTarget();
        me.showOrHide();

    },
    mouseOver:function(){
        if(this.state == 1) return ;
        this.showOrHide(1);
    },
    mouseLeave:function(){
        if(this.state == -1) return ;
        this.showOrHide(-1);
    },
    /**
     * 显示或者隐藏
     * @param flag 1显示 -1 隐藏
     */
    showOrHide : function(flag){
        if(this.lock) return ;
        this.lock = true;
        var me = this ;dockTop = me.dockDom ,
            direction = me.direction,
            dock = dockTop.down('#my-dock');
        flag = flag || -1;
        me.state = flag;
        if(direction == 0 ){
            dockTop.animate({
                duration:1000,
                top:  dockTop.getTop() + dock.getHeight() * (flag),
                callback:function(){
                  me.lock = false;
                }
            })
        }else{
            dockTop.animate({
                duration:1000,
                left: dockTop.getLeft() - dock.getWidth() * direction * (flag),
                callback:function(){
                    me.lock = false;
                }
            })
        }
    },

    initSize : function(direction){
        var me = this; dock = me.dockDom;
        direction = direction || me.direction;
        var viewSize = Ext.getBody().getViewSize(),
            height = viewSize.height*0.6 * direction * direction + 120,
            width = viewSize.width * 0.8 * (direction -1) * (direction +1) + 120 ;

        if(!dock) return ;
        if(width < 0 ) width = width * -1;
        dock.setWidth(width).setHeight(height).setLeft(0.5 * (viewSize.width - width) * (direction + 1))
            .setTop(0.5 * (viewSize.height - height ) * direction * direction).applyStyles({
                'z-index':'1'
            })
        dock.down('#my-dock').setWidth(width * 0.8).setHeight(height * 0.8);
        if(direction == 1){
            dock.down("#my-dock").applyStyles({
                'float':'right',
                'position':'relative'
            })
        }
    },

    initView :function(){
        var view = this.view =new OS.dock.DockView().getView();
        view.render('my-dock') ;
    },
    initDropTarget:function(){
        var dd = new Ext.dd.DDTarget('my-dock-top','dockGroup');
        Ext.get('my-dock-top').parentObj = this;
    },
    addDragDrop:function(data){
           data.src= '../../desktop/images/lxr.png'
          this.view.getStore().add(data);
    }
})

function initializeHospitalDropZone(v) {
    console.log(v);
}