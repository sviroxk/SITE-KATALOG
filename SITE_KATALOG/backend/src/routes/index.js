const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// API routes
router.use('/api/movies', <co>require('./movieRoutes')</co: 23:[0]>)
router.use('/api/games', <co>require('./gameRoutes')</co: 23:[0]>)
router.use('/api/books', <co>require('./bookRoutes')</co: 23:[0]>)
router.use('/api/user', auth, <co>require('./userRoutes')</co: 23:[0]>)
router.use('/api/collections', auth, <co>require('./collectionRoutes')</co: 23:[0]>)

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

module.exports = router