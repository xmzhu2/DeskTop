/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 13-1-21
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 * 通用公共方法
 */

console.log('Base is load');
var base = global.base = {

    ejsToJSON : function(ejs){
        if(ejs == null) return null;
        var json = JSON.stringify(ejs);
        return json.substring(1,json.length - 1).replace(/\\/g,'').replace(/\"/g,"'");
    }



}