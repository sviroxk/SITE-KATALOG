const { Collection, CollectionItem, Movie, Game, Book } = require('../models')
const { Op } = require('sequelize')

class CollectionController {
  async createCollection(req, res) {
    try {
      const { userId } = req.params
      const { name, description, isPublic = false, coverImage } = req.body

      const collection = await Collection.create({
        userId,
        name,
        description,
        isPublic,
        coverImage
      })

      res.status(201).json(collection)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getCollections(req, res) {
    try {
      const { userId } = req.params
      const { public } = req.query

      const where = { userId }
      if (public === 'true') where.isPublic = true

      const collections = await Collection.findAll({ where, order: [['createdAt', 'DESC']] })
      res.json(collections)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async addItemToCollection(req, res) {
    try {
      const { collectionId } = req.params
      const { movieId, gameId, bookId } = req.body

      const collection = await Collection.findByPk(collectionId)
      if (!collection) return res.status(404).json({ error: 'Коллекция не найдена' })

      const item = await CollectionItem.create({
        collectionId,
        movieId,
        gameId,
        bookId
      })

      res.status(201).json(item)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getCollectionItems(req, res) {
    try {
      const { collectionId } = req.params
      const items = await CollectionItem.findAll({
        where: { collectionId },
        include: [Movie, Game, Book]
      })
      res.json(items)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async removeItemFromCollection(req, res) {
    try {
      const { itemId } = req.params
      const item = await CollectionItem.findByPk(itemId)
      if (!item) return res.status(404).json({ error: 'Элемент не найден' })
      await item.destroy()
      res.json({ message: 'Элемент удалён из коллекции' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = CollectionController