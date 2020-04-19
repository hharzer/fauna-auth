const faunadb = require('faunadb')
const userCreator = require('./src/createUser')
const userDeleter = require('./src/deleteUser')
const userGetter = require('./src/getUser')
const userUpdater = require('./src/updateUser')
const authenticator = require('./src/authenticate')
const tokenCreator = require('./src/createTokens')
const tokenRefresher = require('./src/refreshToken')
const tokenDeleter = require('./src/deleteRefreshToken')
const userGetterByToken = require('./src/verifyAndGetUser')

module.exports = ({ dbSecret, accessSecret, refreshSecret, tokenDuration }) => {
  const db = new faunadb.Client({ secret: dbSecret })

  return {
    create: userCreator(db),
    delete: userDeleter(db),
    get: userGetter(db),
    update: userUpdater(db),
    authenticate: authenticator(db),
    createTokens: tokenCreator(db, accessSecret, refreshSecret, tokenDuration),
    refreshToken: tokenRefresher(db, accessSecret, refreshSecret),
    deleteRefreshToken: tokenDeleter(db),
    verify: userGetterByToken(db, accessSecret),
  }
}
