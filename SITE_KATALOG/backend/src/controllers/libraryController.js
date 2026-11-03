const { UserLibrary, Movie, Game, Book } = require('../models')
const { Op } = require('sequelize')

class LibraryController {
  async addToLibrary(req, res) {
    try {
      const { userId } = req.params
      const { movieId, gameId, bookId, status = 'want_to_watch' } = req.body

      const libraryItem = await UserLibrary.create({
        userId,
        movieId,
        gameId,
        bookId,
        status
      })

      res.status(201).json(libraryItem)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getLibrary(req, res) {
    try {
      const { userId } = req.params
      const { type, status } = req.query

      const where = { userId }
      if (type) {
        if (type === 'movie') where.movieId = {[Op.ne]: null}
        if (type === 'game') where.gameId = {[Op.ne]: null}
        if (type === 'book') where.bookId = {[Op.ne]: null}
      }
      if (status) where.status = status

      const items = await UserLibrary.findAll({ where, include: [Movie, Game, Book] })
      res.json(items)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async updateLibraryItem(req, res) {
    try {
      const { id } = req.params
      const { status, rating, review, startDate, finishDate } = req.body

      const item = await UserLibrary.findByPk(id)
      if (!item) return res.status(404).json({ error: 'Элемент не найден' })

      await item.update({ status, rating, review, startDate, finishDate })
      res.json(item)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async removeFromLibrary(req, res) {
    try {
      const { id } = req.params
      const item = await UserLibrary.findByPk(id)
      if (!item) return res.status(404).json({ error: 'Элемент не найден' })
      await item.destroy()
      res.json({ message: 'Элемент удалён из библиотеки' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = LibraryController