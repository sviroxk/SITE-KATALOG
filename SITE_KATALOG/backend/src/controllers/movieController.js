const axios = require('axios')
const { Movie } = require('../models')
const { Op } = require('sequelize')

class MovieController {
  async getAllMovies(req, res) {
    try {
      const { genre, year, search } = req.query
      const where = {}

      if (genre) where.genres = {[Op.contains]: genre}
      if (year) where.releaseDate = {[Op.between]: [`${year}-01-01`, `${year}-12-31`]}
      if (search) where.title = {[Op.iLike]: `%${search}%`}

      const movies = await Movie.findAll({ where, order: [['releaseDate', 'DESC']] })
      res.json(movies)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getMovieById(req, res) {
    try {
      const { id } = req.params
      const movie = await Movie.findByPk(id)
      if (!movie) return res.status(404).json({ error: 'Фильм не найден' })
      res.json(movie)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async syncFromTMDB(req, res) {
    try {
      const { tmdbId } = req.body
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
        headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}` }
      })

      const tmdbData = response.data
      const movie = await Movie.findOrCreate({
        where: { tmdbId: tmdbData.id },
        defaults: {
          title: tmdbData.title,
          originalTitle: tmdbData.original_title,
          overview: tmdbData.overview,
          releaseDate: tmdbData.release_date,
          genres: tmdbData.genres,
          posterPath: tmdbData.poster_path,
          backdropPath: tmdbData.backdrop_path,
          rating: tmdbData.vote_average,
          voteCount: tmdbData.vote_count,
          runtime: tmdbData.runtime,
          status: tmdbData.status
        }
      })

      res.json({ movie: movie[0], updated: !movie[1] })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = MovieController