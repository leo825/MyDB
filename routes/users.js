var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块

var UserModel = require('../modules/users');//导入模型数据模块

var router = express.Router();


/**
 * 根据模型创建实体，指的个体对象
 */
var userEntity = new UserModel({
    name:'zhangxiao',
    paw:'12'
});

//这个是向数据库中插入数据
for(var i = 0; i < 10; i++){
    setTimeout(function(){
        userEntity.save(function(error,doc){
            if(error){
                console.log('error:' + error);
            }else{
                console.log(doc);
            }
        });
    },i*1000);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//查询所有用户数据
router.get('/users', function(req, res, next) {
    Users.fetch(function(err, users) {
        if(err) {
            console.log(err);
        }
        res.render('users',{title: '用户列表', users: users}) //这里也可以json的格式直接返回数据res.json({data: users});
    })
});

router.get('/getUsers', function(req, res, next) {
    res.render('getUsers', { title: '<h1>Express</h1>'
        ,users:[{username: 'Wilson'},
            {username: 'Wilson Zhong'},
            {username: 'Zhong Wei'}]
    });
});


module.exports = router;
