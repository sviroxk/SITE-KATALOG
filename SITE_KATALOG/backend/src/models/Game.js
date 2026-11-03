const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  igdbId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalTitle: DataTypes.STRING,
  description: DataTypes.TEXT,
  releaseDate: DataTypes.DATE,
  genres: DataTypes.JSONB,
  platforms: DataTypes.JSONB,
  coverUrl: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  ratingCritic: DataTypes.FLOAT,
  ratingUser: DataTypes.FLOAT,
  runtime: DataTypes.INTEGER,
  status: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'games',
  timestamps: true
})

module.exports = Game