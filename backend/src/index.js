require('dotenv').config()

const app = require('./app')

const port = Number(process.env.PORT) || 4000

app.listen(port, () => {
  console.log(`SITE KATALOG API listening on port ${port}`)
})
