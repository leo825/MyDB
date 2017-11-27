/**
 * Created by LX on 2017/11/24.
 */

/**
 * 1.首先安装mongoose
 * @type {*|exports}
 */
/**
 * 2.加载模块
 * @type {*|exports}
 */
var mongoose = require('mongoose');

/**
 * 3.连接数据库 mongod服务端 mongo客户端
 * 数据库的名称可以是不存在，如果不存在创建一个myDB数据库
 */
var db = mongoose.connect('mongodb://localhost:27017/myDB');

db.connection.on('error',function(error){
   console.log('数据库连接失败:' + error);
});

db.connection.on('open',function(){
   console.log('数据库连接成功');
});

/**
 * 定义一个schema，描述此集合里有哪些字段，字段是什么类型
 * 只有schema中有的属性才能被保存到数据库中
 */
var UsersSchema = new mongoose.Schema({
    name: String,
    paw: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }},{
    //这个参数主要是为了去掉文档内部的版本号,false是去除版本号
    versionKey: false
});

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else {
        this.meta.updateAt = Date.now();
    }
    next();
});

//查询的静态方法
UsersSchema.statics = {
    fetch: function(cb) { //查询所有数据
        return this
            .find()
            .sort('meta.updateAt') //排序
            .exec(cb) //回调
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

//暴露出去的方法
module.exports = UsersSchema;