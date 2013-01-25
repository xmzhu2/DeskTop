/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午5:11
 * To change this template use File | Settings | File Templates.
 */

var user = require(global.ModelRoot+'/User').model;

exports.login = function(req,res){
    var body = req.body;

 //   console.log("Login : UserName= '"+body.username +"' Password='"+body.password+"'");

    user.find({
        username:body.username,
        password:body.password
    },function(err,reslut){

       // console.log(reslut);
        if(reslut.length == 0 ) {
            res.writeHead("500",{
                'Content-Type': 'text/plain'
            })
            res.end("error")
            return ;
        }

        res.writeHead("200",{
            'Content-Type': 'text/plain'
        });
        req.session.user = reslut;
        res.write(JSON.stringify(reslut));
        res.end();

    });


}

