'use strict'

const S = require('fluent-json-schema')

const error = S.object()
  .prop('message', S.string())

const token = S.object()
  .prop('token', S.string())
  
const toDos = S.object()
  .prop('id', S.string())

module.exports = {
  error,
  token,
  toDos,
}
