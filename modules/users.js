/**
 * Created by LX on 2017/11/24.
 */
var db = require('mongoose');
var UsersSchema = require('../schemas/users'); //拿到导出的数据集模块

/**
 * 注意数据库中存的是users,这个是生成一个模型
 * @type {Aggregate|*|Model}
 */
var UserModel = db.model('users', UsersSchema); // 编译生成Movie 模型

module.exports = UserModel;