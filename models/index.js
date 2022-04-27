//Topic 12 Video 4
let { Sequelize, DataTypes } = require('sequelize')

//which db to connect to? see config.js
//NODE - production, else -- development
let env = process.env.NODE_ENV || 'development'


let config = require(__dirname + '/../config.json')[env]
let db = {}

let sequelize 

if (config.use_env_variable){
    //at Heroku, use postgres
    sequelize= new Sequelize(process.env[config.use_env_variable])
}else{
    //running localy, dev mode, use sqlite
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db