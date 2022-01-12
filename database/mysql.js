const Sequelize = require('sequelize')
const str_con = "mysql://root:root@localhost:3306/blog"
const db = new Sequelize(str_con)

module.exports = db