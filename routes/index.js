
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    res.writeHead("200",{
        'Content-Type': 'text/plain'
    });
    res.write("{callback:function(){alert(5)}}");
    res.end();

}