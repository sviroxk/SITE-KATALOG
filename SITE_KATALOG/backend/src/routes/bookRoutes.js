const express = require('express')
const router = express.Router()
const { BookController } = require('../controllers')

router.get('/', BookController.getAllBooks)
router.get('/:id', BookController.getBookById)
router.post('/sync', BookController.syncFromGoogleBooks)

module.exports = router