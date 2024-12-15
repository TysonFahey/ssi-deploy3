// figure out what data base to connect to then use settings in config.json to make the connection. Also keeps track of the models the app uses. 
const {Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

// env is short for environment which are set for your whole computer or for a server. any application running on the computer or server will be able to read the environemnt variables.
// look for environment variable will be called NODE_ENV and read it's value
// at azure we create an environment variable called NODE_ENV and set it to "production"
// the code will run on your computer and try to find the environemnt variable but won't find it. so we set it to development which will mean use the settings in config.json labeled development
const env = process.env.NODE_ENV || "development"

const config = configJson[env] // read the database configuration object for 'development' or 'productin' based on whatever the env value is 

const sequelize = new Sequelize(config)

// setup data base with sequelize object that has the configuration of how to connect to a database. the Sequelize: Sequelize is a library 
const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // 'student'
database[studentModelName] = studentModel // add new property to database object whith is studentModelName

module.exports = database 