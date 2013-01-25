/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-25
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext.animation.Note',{

    constructor:function(opt,template){
        this.opt = opt;
        this.template = template;
    },
    /**
     * 渲染方法
     * @param renderTo 渲染的目标对象
     */
    append:function(renderTo){
      var me = this,
          opts = me.opt,
          cls = Ext.animation.Note.cls,
          note = me.note = me.template.append(renderTo,opts,true);
       note.setWidth(opts.width).setHeight(opts.height);
       if(opts.inclined){
               note.applyStyles({
                   "-webkit-transform" : "rotate("+opts.inclined_deg+"deg)",
                   "-o-transform":"rotate("+opts.inclined_deg+"deg)",
                   "-moz-transform":"rotate("+opts.inclined_deg+"deg)"
               })
       }
       if(opts.style){
           note.applyStyles(opts.style);
       }

    },
    animate :function(opt){
        var me = this;
        me.note.animate(opt);
    },
    remove:function(){
        var me = this;
        me.note.remove();
    },
    statics:{

        cls:{
            inclined :'note_transform'
        },
        note:{},
        template:[
                "<div class='{cls}'>" ,
                "<p class='{title_cls}'>{title}</p>" ,
                "<br>" ,
                "<p class='{content_cls}'>{content}</p>" ,
                "</div>"
        ],

        defaultOpts:{
            cls : 'note',
            title:'',
            title_cls:'title',
            content_cls:'content',
            content:'',
            //是否有角度
            inclined : false,
            inclined_deg : -6,
            width:200,
            height:200
        },

        createNote:function(opt,template){
            opt = Ext.apply(this.defaultOpts,opt);
            var t = new Ext.Template(this.template);
            t.compile();
            return new Ext.animation.Note(opt,t);
        }

    }


})