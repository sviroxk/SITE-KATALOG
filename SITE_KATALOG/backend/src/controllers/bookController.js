const axios = require('axios')
const { Book } = require('../models')
const { Op } = require('sequelize')

class BookController {
  async getAllBooks(req, res) {
    try {
      const { genre, author, search } = req.query
      const where = {}

      if (genre) where.genres = {[Op.contains]: genre}
      if (author) where.authors = {[Op.contains]: author}
      if (search) {
        where[Op.or] = [
          { title: {[Op.iLike]: `%${search}%`} },
          { authors: {[Op.iLike]: `%${search}%`} }
        ]
      }

      const books = await Book.findAll({ where, order: [['publicationDate', 'DESC']] })
      res.json(books)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params
      const book = await Book.findByPk(id)
      if (!book) return res.status(404).json({ error: 'Книга не найдена' })
      res.json(book)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async syncFromGoogleBooks(req, res) {
    try {
      const { isbn } = req.body
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: { q: `isbn:${isbn}` }
      })

      if (response.data.totalItems === 0) {
        return res.status(404).json({ error: 'Книга не найдена' })
      }

      const bookData = response.data.items[0].volumeInfo
      const book = await Book.findOrCreate({
        where: { isbn: isbn || bookData.industryIdentifiers?.[0]?.identifier },
        defaults: {
          title: bookData.title,
          originalTitle: bookData.title,
          authors: bookData.authors || [],
          description: bookData.description,
          publicationDate: bookData.publishedDate,
          genres: bookData.categories || [],
          language: bookData.language,
          publisher: bookData.publisher,
          pages: bookData.pageCount,
          coverUrl: bookData.imageLinks?.thumbnail,
          rating: bookData.averageRating
        }
      })

      res.json({ book: book[0], updated: !book[1] })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = BookController