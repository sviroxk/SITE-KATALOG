const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tmdbId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalTitle: DataTypes.STRING,
  overview: DataTypes.TEXT,
  releaseDate: DataTypes.DATE,
  genres: DataTypes.JSONB,
  posterPath: DataTypes.STRING,
  backdropPath: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  voteCount: DataTypes.INTEGER,
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
  tableName: 'movies',
  timestamps: true
})

module.exports = Movie