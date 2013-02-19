/**
 * Created with JetBrains WebStorm.
 * User: rongwang
 * Date: 12-12-24
 * Time: 下午5:11
 * To change this template use File | Settings | File Templates.
 */

var userDao= require(global.ModelRoot+'/User').model;

/**
 * 登陆
 * @param req
 * @param res
 */
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
/**
 * 得到所有用户 试图
 * @param req
 * @param res
 */
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

/**
 * 得到用户信息
 * @param req
 * @param res
 */
exports.getUserInfo = function(req,res){
     var objectId = req.body.objectid;
    userDao.findById(objectId,{'userInfo':1},function(err,reslut){
        if(err || reslut.length == 0 ) {
            res.writeHead("500",{
                'Content-Type': 'text/plain'
            })
            res.end("error")
            return ;
        }

        res.writeHead("200",{
            'Content-Type': 'text/plain'
        });
        var userInfo = reslut.userInfo || {};
        res.write(JSON.stringify(userInfo));
        res.end();

    });
}

/**
 * 保存用户信息
 * @param req
 * @param res
 */
exports.save = function(req,res){
    //TODO session用户权限控制

    var objectId = req.body.objectid;
    console.log(req.body.user);

}

exports.update = function(req,res){
    var body = req.body;
    var id = body.objectid,
        updateStr = body.updateStr,
        updateCon = body.updateCon;
    console.log(updateStr+" : " +updateCon);
    userDao.findByIdAndUpdate(id,{$set:{"userInfo" : JSON.parse(updateCon)}},function(err,user){
        if(err){
            console.err(err);
            return ;
        }
        console.log(user);
        res.writeHead("200",{
            'Content-Type': 'text/plain'
        });
        res.end();
    })
}

exports.getUserInfoByQuery = function(req,res){
    var objectId = req.body.objectid,
        query = req.body.query,
        queryObject = JSON.parse('{"'+query+'":1}');
    console.log(JSON.stringify(queryObject)+" "+ objectId);

    if(!objectId) return ;
    userDao.findById(objectId,queryObject,function(err,reslut){
        if(err || reslut ==null || reslut.length == 0 ) {
            res.writeHead("500",{
                'Content-Type': 'text/plain'
            })
            res.end("error")
            return ;
        }

        res.writeHead("200",{
            'Content-Type': 'text/plain'
        });
        console.log(reslut);
        var queryInfo = reslut[query] || {};
        res.write(JSON.stringify(queryInfo));
        res.end();

    });
}