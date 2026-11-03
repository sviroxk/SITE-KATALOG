const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'sitekatalog',
  process.env.DATABASE_USER || 'user',
  process.env.DATABASE_PASSWORD || 'password',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    logging: false
  }
)

module.exports = { sequelize }