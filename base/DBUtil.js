/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-22
 * Time: 下午7:12
 * To change this template use File | Settings | File Templates.
 */

global.dbbase = {
    url : 'mongodb://localhost/desktop'

};
var url = global.dbbase.url  ;

var mongoose = global.mongoose = require('mongoose');

    mongoose.connect(url);

global.Schema = mongoose.Schema;