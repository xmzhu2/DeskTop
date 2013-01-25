/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-25
 * Time: 上午11:08
 * To change this template use File | Settings | File Templates.
 */


require('../config/config');
require('../base/DBUtil');

var user = require('../model/User').model;

var app = require('../model/UserApp').model;

var a1 = new app();
a1.appName = 'test2';


user.find({
    username:'sadmin'

},function(err,res){
    var u = new user();
        u.from(res[0]);

    console.log(u.addApps(a1));
    u.save();
})

