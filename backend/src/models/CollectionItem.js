const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const CollectionItem = sequelize.define('CollectionItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: DataTypes.INTEGER,
  gameId: DataTypes.INTEGER,
  bookId: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'collection_items',
  timestamps: true
})

module.exports = CollectionItem