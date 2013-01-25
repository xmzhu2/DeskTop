/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-23
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 *
 * 加载动画
 */


Ext.define('Ext.animation.AnimationUtil',{

    requires:[
        'Ext.DomHelper',
        'Ext.animation.Note'
    ],

    statics:{
        config:{
            left_id :'left_e1',
            right_id :'right_e1',
            left_cls :'left',
            right_cls :'right',
            login_id :'login_e1',
            login_cls:'login',

            regist_id :"regist_e1",
            regist_cls:'regist',

            //输入框id
            username_id:'username_id_01',
            password_id:'password_id_01'
        },
        dom:{},
        registTemplet :"<div class='zc'>注册须知<br><ul><li>注册不是你想注</li><li>想注就能注</li></ul></div>",
        getAnimation: function(name,callback){


        },
        /**
         * 初始化登陆页面
         */
        initLogin:function(callbackObject,callbackName){
            var me = Ext.animation.AnimationUtil
               ,config = me.config
               , dh = Ext.core.DomHelper
               ,left  = me.dom.left =  dh.append(Ext.getBody(),{tag:'div',id:config.left_id, cls:config.left_cls  },true)
               ,right = me.dom.right = dh.append(Ext.getBody(),{tag:'div',id:config.right_id, cls:config.right_cls  },true);

            var login = me.dom.login
                = dh.append(Ext.getBody(),{tag:'div',id:config.login_id,cls:config.login_cls},true);

            if(callbackObject[callbackName]) {
                me.loginFunc = callbackName;
                me.callbackObject = callbackObject;
            }
            me.initSize();
            me.initLoginForm(me);
            Ext.EventManager.onWindowResize(function(){
                me.initSize();
            })

        },
        //初始化页面
        initSize :function(left,right,login){
            var me = Ext.animation.AnimationUtil;
            left = left || me.dom.left;
            right = right || me.dom.right;
            login = login || me.dom.login;
            var viewSize = me.viewSize =  Ext.getBody().getViewSize();
            left.setWidth(viewSize.width*0.5).setHeight(viewSize.height)
                .setTop(0).setLeft(0);
            right.setWidth(viewSize.width*0.5).setHeight(viewSize.height)
                .setTop(0).setLeft(viewSize.width*0.5);
            login.setWidth(viewSize.width*0.5).setHeight(viewSize.height*0.5)
                .setTop(viewSize.height*0.25).setLeft(viewSize.width*0.25)

        },
        /**
         * 初始化登陆框
         */
        initLoginForm : function(me){

            var login = me.dom.login
                ,username = "<div class='label'><span id='username_span' >用户名:</span>" +
                    "<input id='"+me.config.username_id+"' name='username' type='text' /></div>"
                ,password = "<div class='label'><span id='password_span'>密  码:</span>" +
                    "<input id='"+me.config.password_id+"' name='password' type='password' /></div>"
                ,dh = Ext.core.DomHelper;

            username = me.dom.username =  dh.append(login,username,true)
                .setTop(login.getHeight()*0.15).setLeft(login.getWidth()*0.1);
            password = me.dom.password = dh.append(login,password,true)
                .setTop(login.getHeight()*0.15+username.getHeight()).setLeft(login.getWidth()*0.1);

            var login_button = '<a href="#" data-icon="" class="button blue">登陆</a>',
                exit_button ='<a href="#" data-icon="❀" class="button orange brackets" >注册</a>'
            login_button = me.dom.login_button =  dh.append(login,login_button ,true)
                .setTop(login.getHeight()*0.45).setLeft(login.getWidth()*0.2);
            exit_button = me.dom.exit_button =  dh.append(login,exit_button,true)
                .setTop(login.getHeight()*0.45).setLeft(login.getWidth()*0.2+login_button.getWidth()*0.5);

            login_button.on('click',me.login,me);
            exit_button.on('click',me.regist,me);

        },
        login :function(){
            var me = this
               username = Ext.get(me.config.username_id).getValue(),
               password = Ext.get(me.config.password_id).getValue();
            if(!username || !password){
                me.loginErr();
                return;
            }
            if(me.loginFunc){
                me.callbackObject[me.loginFunc](username,password,me.loginCallBack,me);
            }else{
                //TODO
                //测试动画用的语句
                //me.loginSuccess(me);
                console.error("Can not find login Function! error is in AnimationUtil.js");
            }
        },
        /**
         * 登陆回调方法，登陆成功或者失败调用
         * @param scorp  回调方法调用者
         * @param flag   成功失败标志
         * @param data   回调数据
         */
        loginCallBack:function(scorp,flag,data){

            if(flag == null) {
                scorp.loginSuccess();
            }else{
                scorp.loginErr(data);
            }

        },
        /**
         * 登陆失败动作
         * @param data
         */
        loginErr:function(data){
            var me = this;
            var login = me.dom.login,left = me.dom.left;
            var shanke_ = 16 , aspect = 2;
            data = data||{msg:"没有提示自己猜测"}
            function shake(){
                if(shanke_-- == 0) return ;
                aspect *=-1;
                login.animate({
                    duration: 7*shanke_,
                    top:login.getTop()-shanke_*aspect,
                    callback:function(){
                        shake();
                    }
                })
            }
            shake();
            var note = Ext.animation.Note.createNote({
                title:'提示',
                content:data.msg,
                width:300,
                height:100,
                style:{
                    background:"#e1efef",
                    color:'blue'
                }
            });
            note.append(left);
            note.animate({
                left:note.note.getLeft()*4,
                duration:180,
                callback:function(){
                    note.animate({
                        duration:1000,
                        callback:function(){
                            note.remove();
                        }
                    })

                }
            });
        },
        /**
         * 登陆成功动画
         * @param me
         */
        loginSuccess :function(){
            var me = this;
            var dom = me.dom;
            dom.login.fadeOut({
                endOpacity: 0.5, //can be any value between 0 and 1 (e.g. .5)
                duration: 1000,
                easing:'easeIn',
                callback : function(){
                    dom.left.animate({
                        width:0,
                        duration: 2500

                    })
                    dom.right.animate({
                        left:dom.right.getWidth()+dom.right.getLeft(),
                        duration: 2500
                    })
                }
            })

        },
        /**
         * 注册动画
         */
        regist:function(){
            var me = this;

            if(me.reigst_flag)   return;
            me.reigst_flag = true;

            if(me.dom.regist) {
                me.dom.regist.remove();
                me.dom.regist = {};
            }

            var right =  me.dom.right
                ,login =  me.dom.login
                ,left  =  me.dom.left
                ,config = me.config
                ,exit_button = me.dom.exit_button
                ,dh = Ext.core.DomHelper;

            var regist =  me.initRegist();

            var note = Ext.animation.Note.createNote({
                title:'注册通告',
                content:'注册不是你想注，想注就能注',
                width:300,
                height:300

            });

            login.animate({
                left :'0',
                top:me.viewSize.height-login.getHeight()-20,
                duration: 1000,
                callback:function(){
                    note.append(left);
                    note.animate({
                        left:note.note.getLeft()*4,
                        duration:80
                    });
                }
            })
            right.animate({
                duration: 1000,
                top :right.getHeight()*0.7,
                height:right.getHeight()*0.3

            })
            regist.animate({
                height:right.getHeight()*0.7,
                duration:1000
            })
        },

        initRegist:function(){
            var me  = this,
                dh = Ext.core.DomHelper,
                right = me.dom.right,
                config = me.config;
            var regist = me.dom.regist
                = dh.append(Ext.getBody(),{tag:'div',id:config.regist_id, cls:config.regist_cls  },true);

            regist.setWidth(right.getWidth())
                .setTop(0).setLeft(right.getLeft());

            dh.append(regist,'<span class="regist_button text">加入我们</span>')

            return regist;
        }

    }
})

