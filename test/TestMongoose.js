/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-22
 * Time: 下午5:11
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var con = mongoose.createConnection();


var UserSchema = mongoose.Schema({
    username:String,
    password:String
});


var Users = con.model("user_apps1",UserSchema)
    ,user = new Users();

user.username="2222";
user.password = "2222";

//var con = mongoose.connect();


user.save();

Users.find(function(err,user){
    if(err)
        console.error(err);
    console.log(user);

});

Users.find(function(err,user){
    if(err)
        console.error(err);
    console.log(user);

});
