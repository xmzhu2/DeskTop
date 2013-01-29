/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午5:11
 * To change this template use File | Settings | File Templates.
 */

var userDao= require(global.ModelRoot+'/User').model;

exports.login = function(req,res){
    var body = req.body;

    console.log("Login : UserName= '"+body.username +"' Password='"+body.password+"'");

    userDao.find({
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

exports.getUserView = function(req,res){

    console.log("用户信息查询 :"+new Date());
    userDao.find({},{'username':1,'_id':1},function(err,reslut){
        if(err){
            console.err("用户查询出错 \r\n"+ err);
            return;
        }
        res.writeHead("200",{
            'Content-Type': 'text/plain'
        });
        res.write(JSON.stringify(reslut));
        res.end();
    })

}