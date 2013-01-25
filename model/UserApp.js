/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午6:26
 * To change this template use File | Settings | File Templates.
 */

var ObjectId = global.Schema.ObjectID;
var UserAPPSchema =  new global.Schema({
    appName:String,
    appPath:String

})

UserAPPSchema.path('userApps');

module.exports.model = UserApp = global.mongoose.model('UserApp',UserAPPSchema);

module.exports.schema = UserAPPSchema;