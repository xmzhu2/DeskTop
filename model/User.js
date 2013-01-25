/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-22
 * Time: 下午2:46
 * To change this template use File | Settings | File Templates.
 */

var UserApp = require('./UserApp');

var UserSchema = new global.Schema({
    username:String,
    password:String,
    userApps : [UserApp.schema]
})



UserSchema.methods.addApps = function(app){
    if(!app instanceof  UserApp.model)
        return;
    return this.userApps.push(app);
}

UserSchema.methods.from = function(model){
    for(var x in model)
        this[x] = model[x];

}



User  = global.mongoose.model("user",UserSchema);
module.exports.model = User;
module.exports.schema = UserSchema;