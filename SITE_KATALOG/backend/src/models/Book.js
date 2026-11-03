const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalTitle: DataTypes.STRING,
  authors: DataTypes.JSONB,
  description: DataTypes.TEXT,
  publicationDate: DataTypes.DATE,
  genres: DataTypes.JSONB,
  language: DataTypes.STRING,
  publisher: DataTypes.STRING,
  pages: DataTypes.INTEGER,
  coverUrl: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  ratingGoodreads: DataTypes.FLOAT,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'books',
  timestamps: true
})

module.exports = Book