const typeorm = require('typeorm')
require('dotenv').config();

const CategoryEntity = require('./model/Category').CategoryEntity
const PostEntity = require('./model/Post').PostEntity

const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [ CategoryEntity, PostEntity ],
  synchronize: true // it will create / alter the tables automatically
})

dataSource
  .initialize()
  .then( function() {
    console.log('Connected to database')
  })
  .catch( function(error) {
    console.log('Problem in connecting to database ', error)
  })


module.exports = { dataSource }