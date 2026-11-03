const express = require('express')
const router = express.Router()
const { MovieController } = require('../controllers')

router.get('/', MovieController.getAllMovies)
router.get('/:id', MovieController.getMovieById)
router.post('/sync', MovieController.syncFromTMDB)

module.exports = router