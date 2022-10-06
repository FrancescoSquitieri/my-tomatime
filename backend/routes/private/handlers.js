"use strict";

const fetch = require('node-fetch');

async function addTodo(request, reply) {
    const {username} = request.user;
    const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
    const todos = this.mongo.db.collection(`todos`);
    const {title, description} = request.body;
    const date = new Date();
    const [month, day, year, hour, min, sec] = [date.getUTCMonth(), date.getUTCDay(), date.getUTCFullYear(), date.getUTCHours(), date.getUTCHours(), date.getUTCSeconds()];
    const currentDate = `${day}/${month}/${year} ${hour}:${min}:${sec}`
    try {
        const task = await todos.insertOne(
            Object.assign(
                {title, description},
                {
                    status: 'todo',
                    userId,
                    updatedAt: currentDate
                }
            )
        );
        const taskCreated = await this.mongo.db.collection(`todos`).findOne({"_id": task.insertedId});
        reply.send(taskCreated);
    } catch (err) {
        return this.httpErrors.badRequest("something is missing");
    }
    reply.code(200).send();
}

async function nextStatus(request, reply) {
    try {
        const {username} = request.user;
        const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
        let task = {};
        const id = this.mongo.ObjectId(request.params.id);
        const todosCollection = this.mongo.db.collection(`todos`);
        const findTaskByIdParam = await todosCollection.findOne({_id: id});
        const someTaskInWorkingAt = await todosCollection.findOne({status: "workingAt", userId});
        const date = new Date();
        const [month, day, year, hour, min, sec] = [date.getUTCMonth(), date.getUTCDay(), date.getUTCFullYear(), date.getUTCHours(), date.getUTCHours(), date.getUTCSeconds()];
        const currentDate = `${day}/${month}/${year} ${hour}:${min}:${sec}`
        if (findTaskByIdParam.status === "workingAt") {
            const taskUpdated = await todosCollection.findOneAndUpdate({_id: id, userId}, {
                $set: {
                    status: "done",
                    updatedAt: currentDate
                }
            });
            task = await todosCollection.findOne({_id: taskUpdated.value._id, userId});
        }
        if (findTaskByIdParam.status === "todo" && !someTaskInWorkingAt) {
            const taskUpdated = await todosCollection.findOneAndUpdate({_id: id, userId}, {
                $set: {
                    status: "workingAt",
                    updatedAt: currentDate
                }
            });
            task = await todosCollection.findOne({_id: taskUpdated.value._id, userId});
        }
        if (findTaskByIdParam.status === "todo" && someTaskInWorkingAt) {
            return reply.code(400).send({message: "Some task already in working at"})
        }
        if (findTaskByIdParam.status === "done") {
            return reply.code(400).send({message: "To back status from done call endpoint '/backStatus/IdOfTask' "})
        }
        return reply.code(200).send(task);
    } catch (err) {
        console.dir(err);
        return reply.code(500).send({err});
    }
}

async function backStatus(request, reply) {
    try {
        const {username} = request.user;
        const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
        let task = {};
        const id = this.mongo.ObjectId(request.params.id);
        const todosCollection = this.mongo.db.collection(`todos`);
        const findTaskByIdParam = await todosCollection.findOne({_id: id});
        const someTaskInWorkingAt = await todosCollection.findOne({status: "workingAt", userId});
        const date = new Date();
        const [month, day, year, hour, min, sec] = [date.getUTCMonth(), date.getUTCDay(), date.getUTCFullYear(), date.getUTCHours(), date.getUTCHours(), date.getUTCSeconds()];
        const currentDate = `${day}/${month}/${year} ${hour}:${min}:${sec}`
        if (findTaskByIdParam.status === "workingAt") {
            const taskUpdated = await todosCollection.findOneAndUpdate({_id: id, userId}, {
                $set: {
                    status: "todo",
                    updatedAt: currentDate
                }
            });
            task = await todosCollection.findOne({_id: taskUpdated.value._id, userId});
        }
        if (findTaskByIdParam.status === "done" && !someTaskInWorkingAt) {
            const taskUpdated = await todosCollection.findOneAndUpdate({_id: id, userId}, {
                $set: {
                    status: "workingAt",
                    updatedAt: currentDate
                }
            });
            task = await todosCollection.findOne({_id: taskUpdated.value._id, userId});
        }
        if (findTaskByIdParam.status === "done" && someTaskInWorkingAt) {
            return reply.code(400).send({message: "Some task already in working at"})
        }
        if (findTaskByIdParam.status === "todo") {
            return reply.code(400).send({message: "To back status from done call endpoint '/nextStatus/IdOfTask' "})
        }
        return reply.code(200).send(task);
    } catch (err) {
        console.dir(err);
        return reply.code(500).send({err});
    }
}

async function getTodos(request, reply) {
    try {
        const todosCollection = this.mongo.db.collection(`todos`);
        const todos = await todosCollection.find({}).toArray();
        // reply.send(todos);
        return todos;
    } catch (error) {
        reply.send(error);
    }

}

async function getTodoTasks(request, reply) {
    try {
        const {username} = request.user;
        const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
        const tasksInTodoStatus = await this.mongo.db.collection(`todos`).find({status: "todo", userId}).toArray();
        const filteredTasks = [...tasksInTodoStatus].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        if (!tasksInTodoStatus) return reply.code(204).send();
        return reply.code(200).send(filteredTasks);
    } catch (error) {
        reply.code(500).send({error});
    }

}

async function getWorkingAtTask(request, reply) {
    try {
        const {username} = request.user;
        const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
        const tasksInWorkingAt = await this.mongo.db.collection(`todos`).findOne({status: "workingAt", userId});
        if (!tasksInWorkingAt) return reply.code(204).send();
        return reply.code(200).send(tasksInWorkingAt);
    } catch (error) {
        reply.code(500).send({error});
    }

}

async function getDoneTasks(request, reply) {
    try {
        const {username} = request.user;
        const {_id: userId} = await this.mongo.db.collection(`users`).findOne({username});
        const tasksInDoneStatus = await this.mongo.db.collection(`todos`).find({status: "done", userId}).toArray();
        const filteredTasks = [...tasksInDoneStatus].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        if (!tasksInDoneStatus.length) return reply.code(204).send();
        return reply.code(200).send(filteredTasks);
    } catch (error) {
        reply.code(500).send({error});
    }

}

async function deleteTask(request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        await this.mongo.db.collection(`todos`).findOneAndDelete({_id: id});
        return reply.code(204).send();
    } catch (error) {
        reply.code(500).send({error});
    }

}

async function startTomato(request, reply) {
    try {
        const {username} = request.user;
        const {
            _id: userId,
            tomatoConfiguration,
            tomatoStep
        } = await this.mongo.db.collection(`users`).findOne({username});
        const stepOfUser = tomatoConfiguration[tomatoStep];
        const setStartTimeOfStep = new Date().getTime() + stepOfUser.tomatoDuration;
        const setStartTomatoOfUser = await this.mongo.db.collection(`users`).findOneAndUpdate({_id: userId}, {
            $set: {
                tomatoStartedAt: setStartTimeOfStep
            }
        });

    } catch (error) {
        reply.code(500).send({error});
    }

}

async function endStepTomato(request, reply) {
    try {
        const {username} = request.user;
        let {
            _id: userId,
            tomatoConfiguration,
            tomatoStep
        } = await this.mongo.db.collection(`users`).findOne({username});
        if (tomatoConfiguration.length === tomatoStep + 1) {
            const resetCycle = await this.mongo.db.collection(`users`).findOneAndUpdate({_id: userId}, {
                $set: {
                    tomatoStep: 0,
                    tomatoStartedAt: false,
                    breakStartedAt: false,
                    tomatoTimeDifference: false
                }
            });
        } else {
            const nextStepOfCycle = await this.mongo.db.collection(`users`).findOneAndUpdate({_id: userId}, {
                $set: {
                    tomatoStep: tomatoStep + 1,
                    tomatoStartedAt: false,
                    breakStartedAt: false,
                    tomatoTimeDifference: false
                }
            });
        }

    } catch (error) {
        reply.code(500).send({error});
    }

}

async function breakTomato(request, reply) {
    try {
        const {username} = request.user;
        let {
            _id: userId
        } = await this.mongo.db.collection(`users`).findOne({username});
        const resetCycle = await this.mongo.db.collection(`users`).findOneAndUpdate({_id: userId}, {
            $set: {
                tomatoStep: 0,
                tomatoStartedAt: false,
                breakStartedAt: false
            }
        });
    } catch (error) {
        reply.code(500).send({error});
    }

}

async function startBreak(request, reply) {
    try {
        const {username} = request.user;
        let {
            _id: userId,
            tomatoConfiguration,
            tomatoStep
        } = await this.mongo.db.collection(`users`).findOne({username});
        const stepOfUser = tomatoConfiguration[tomatoStep];
        const setStartTimeOfBreak = new Date().getTime() + stepOfUser.breakDuration;
        const setStartBreakOfUser = await this.mongo.db.collection(`users`).findOneAndUpdate({_id: userId}, {
            $set: {
                tomatoStartedAt: false,
                breakStartedAt: setStartTimeOfBreak
            }
        });
    } catch (error) {
        reply.code(500).send({error});
    }

}
async function getUserInfo(request, reply) {
    try {
        const {username} = request.user;
        const user = await this.mongo.db.collection(`users`).findOne({username});
        reply.send(user);
    } catch (error) {
        reply.code(500).send({error});
    }

}

module.exports = {
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
};
