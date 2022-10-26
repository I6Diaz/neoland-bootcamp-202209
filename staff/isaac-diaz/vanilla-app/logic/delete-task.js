function deleteTask(userEmail, taskId){
    if (typeof userEmail !== 'string') throw new TypeError('userEmail is not a string')
    if (!IS_EMAIL_REGEX.test(userEmail)) throw new Error('userEmail is not valid')

    if (typeof taskId !== 'string') throw new TypeError('taskId is not a string')
    if (taskId.length < 6 || !taskId.startsWith('task-')) throw new Error('invalid taskId')

    //TODO find task in db by id, validate it belongs to user (email), and delete it (remove from db)

    let found = false

    for(let i = 0; i < users.length && !found; i++) {
        const user = users[i]

        if(user.email === userEmail)
        found = true
    }
    if(!found) throw new Error('user with email ' + userEmail + ' not found')

    let foundTask, index = -1

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]

        if(task.id === taskId) {
            foundTask = task

            index = i
        }
    }

    if (!foundTask) throw new Error('task with id ' + taskId + ' does not belong with user with email ' + userEmail)

    for(let i = 0; i < tasks.length; i++) {
        tasks[i] = tasks[i + 1]
    }

    tasks.length--
}