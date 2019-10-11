var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var svgCaptcha = require('svg-captcha');

 
/* POST users listing. */
//登录
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
 
    handler(req, res, "user", {name: req.body.username},function(data){
        if(data.length===0){
            res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
        }else if(data[0].password !== password){
            res.end('{"err":"密码不正确"}');
        }else if(data.length!==0&&data[0].password===password){
            
            req.session.username = req.body.username; //存session
            req.session.password = password;
            
            res.end('{"success":"true"}');
        }
        
    });
    
});

router.post('/is_login', function(req, res, next) {
	if(req.session.username){
		res.end('{"username": "' + req.session.username + '"}')
	}
});

router.post('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

router.get('/get-img-verify', function (req, res) {
    //console.log(req.query);
    var option = req.query;
    // 验证码，有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create(option);
    // 保存到session,忽略大小写
    req.session["randomcode"] = code.text.toLowerCase();
    // 返回数据直接放入页面元素展示即可
    res.send({
        img: code.data
    });
});

router.get('/verify-code', function(req, res, next){
	var imgcode = req.query.imgcode.toLowerCase();
	var is_verify = false;
	
	if(imgcode == req.session['randomcode']){
		is_verify = true;
	}
	
	res.send({
		is_verify: is_verify
	});
});

 
module.exports = router;
