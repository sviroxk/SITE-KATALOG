const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

app.use(helmet())
app.use(cors({ origin: clientUrl, credentials: true }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

module.exports = app
