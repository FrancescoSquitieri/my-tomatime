'use strict'

const S = require('fluent-json-schema')

const schema = require('../public/schema')

const {
    addTodo,
    getTodos,
    nextStatus,
    getTodoTasks,
    getWorkingAtTask,
    getDoneTasks,
    deleteTask,
    backStatus,
    startTomato,
    endStepTomato,
    breakTomato,
    startBreak,
    getUserInfo
} = require('./handlers')

module.exports = async function (fastify, opts) {
    fastify.post('/todo', {
        schema: {
            body: S.object()
                .prop('title', S.string()
                    .description('The title of the task')
                    .required())
                .prop('description', S.string()
                    .maxLength(50)
                    .description('The description of the task')
                ),
            response: {
                200: S.object()
                    .prop('title', S.string()
                        .description('The title of the task')
                        .required())
                    .prop('description', S.string()
                        .maxLength(50)
                        .description('The description of the task')
                    )
                    .prop('status', S.string()
                        .maxLength(50)
                        .description('The description of the task')
                    )
                    .prop('_id', S.string()
                        .maxLength(50)
                        .description('The description of the task')
                    )
                    .prop('userId', S.string()
                        .maxLength(50)
                        .description('The description of the task')
                    )
                    .prop('updatedAt', S.string()
                        .maxLength(50)
                        .description('The description of the task')
                    ),
                400: schema.error
            }
        }
    }, addTodo)
    fastify.post('/todos', {
        schema: {
            body: S.object()
                .prop('token', S.string()
                ),
            response: {
                200: S.array(),
                400: schema.error
            }
        }
    }, getTodos)
    fastify.put('/nextStatus/:id', {
        schema: {
            params: {
                type: "object"
            },
            response: {
                200: S.object()
                        .prop('_id', S.string())
                        .prop('title', S.string())
                        .prop('description', S.string())
                        .prop('status', S.string())
                        .prop('userId', S.string())
                        .prop('updatedAt', S.string()),
                400: S.object()
                    .prop('message', S.string())
            }
        }
    }, nextStatus)
    fastify.put('/backStatus/:id', {
        schema: {
            params: {
                type: "object"
            },
            response: {
                200: S.object()
                        .prop('_id', S.string())
                        .prop('title', S.string())
                        .prop('description', S.string())
                        .prop('status', S.string())
                        .prop('userId', S.string())
                        .prop('updatedAt', S.string()),
                400: S.object()
                    .prop('message', S.string())
            }
        }
    }, backStatus)
    fastify.post('/getTodoTasks', {
        schema: {
            response: {
                200: S.array(),
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, getTodoTasks)
    fastify.post('/getWorkingAtTask', {
        schema: {
            response: {
                200: S.object()
                    .prop('_id', S.string())
                    .prop('title', S.string())
                    .prop('description', S.string())
                    .prop('status', S.string()),
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, getWorkingAtTask)
    fastify.post('/getDoneTasks', {
        schema: {
            response: {
                200: S.array(),
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, getDoneTasks)
    fastify.delete('/deleteTask/:id', {
        schema: {
            response: {
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, deleteTask)
    fastify.post('/startTomato', {
        schema: {
            response: {
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, startTomato)
    fastify.post('/endStepTomato', {
        schema: {
            response: {
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, endStepTomato)
    fastify.post('/breakTomato', {
        schema: {
            response: {
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, breakTomato)
    fastify.post('/startBreak', {
        schema: {
            response: {
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, startBreak)
    fastify.post('/getUserInfo', {
        schema: {
            response: {
                200: S.object()
                    .prop('_id', S.string())
                    .prop('username', S.string())
                    .prop('fullName', S.string())
                    .prop('tomatoConfiguration', S.array())
                    .prop('tomatoStep', S.number())
                    .prop('tomatoStartedAt', S.number())
                    .prop('breakStartedAt', S.number()),
                500: S.object()
                    .prop('error', S.string())
            }
        }
    }, getUserInfo)
}
