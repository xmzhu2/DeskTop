/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-22
 * Time: 下午4:06
 * To change this template use File | Settings | File Templates.
 */

var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db = new mongodb.Db('desttop',server,{safe:true});
db.open(function(err,db){
    if(!err)
    {
        console.log('connect');
    }else{
        console.log(err);
    }

});