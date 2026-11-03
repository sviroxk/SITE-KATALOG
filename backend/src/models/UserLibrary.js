const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const UserLibrary = sequelize.define('UserLibrary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: DataTypes.INTEGER,
  gameId: DataTypes.INTEGER,
  bookId: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('want_to_watch', 'watching', 'watched', 'favorite', 'postponed', 'abandoned'),
    defaultValue: 'want_to_watch'
  },
  rating: DataTypes.FLOAT,
  review: DataTypes.TEXT,
  startDate: DataTypes.DATE,
  finishDate: DataTypes.DATE,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_libraries',
  timestamps: true
})

module.exports = UserLibrary