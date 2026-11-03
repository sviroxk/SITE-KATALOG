const { sequelize } = require('./config/database')
const User = require('./models/User')

// Ассоциации моделей
User.belongsToMany(require('./models/Movie'), { through: 'UserMovies' })
User.belongsToMany(require('./models/Game'), { through: 'UserGames' })
User.belongsToMany(require('./models/Book'), { through: 'UserBooks' })

module.exports = {
  sequelize,
  User
}