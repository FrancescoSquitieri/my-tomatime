'use strict'

const securePassword = require('secure-password')
const startTomatoConfiguration = require('../../utils/startConfigurationTomato');

const DUPLICATE_KEY_ERROR = 11000

async function signup (request, reply) {
  const users = this.mongo.db.collection('users')
  const pwd = securePassword()

  const user = request.body
  const hashedPassword = await pwd.hash(Buffer.from(user.password))
  console.log(user);

  try {
    await users.insertOne(Object.assign(user, {
      password: hashedPassword,
      profile: 'admin',
      tomatoConfiguration: startTomatoConfiguration,
      tomatoStep: 0,
      tomatoStartedAt: false,
      breakStartedAt: false
    }))
  } catch (err) {
    // return this.httpErrors.badRequest(err.message)
    // duplicate key error
    if (err.code === DUPLICATE_KEY_ERROR) {
      return this.httpErrors.badRequest('username already registered')
    }
  }

  reply.code(204).send()
}

async function signin (request, reply) {
  const users = this.mongo.db.collection('users')
  const pwd = securePassword()

  const { username, password } = request.body
  const user = await users.findOne({ username })

  if (!user) {
    return this.httpErrors.notFound('username not found')
  }

  const res = await pwd.verify(Buffer.from(password), user.password.buffer)
  switch (res) {
    case securePassword.INVALID_UNRECOGNIZED_HASH:
      return this.httpErrors.badRequest('This hash was not made with secure-password. Attempt legacy algorithm')
    case securePassword.INVALID:
      return this.httpErrors.badRequest('Invalid password')
  }

  const token = await reply.jwtSign({ username, fullName: user.fullName, profile: user.profile })
  return { token }
}

async function me (request) {
  return request.user
}

module.exports = {
  signup,
  signin,
  me
}
