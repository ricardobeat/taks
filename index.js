const { promisify } = require('util')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const _tasks = {}

function task (name, fn) {
    _tasks[name] = fn
}

task.run = async function (name, wait) {
    if (!name) {
        return console.warn('Usage: node task', Object.keys(_tasks))
    }

    if (!_tasks[name]) {
        console.warn(`Error: no task '${name}'`)
        return process.exit(1)
    }

    console.info(`\n>> Running task: ${name}`)
    return _tasks[name].call()
}

task.parallel = async function (tasks) {
    await Promise.all(tasks.map(t => task.run(t)))
}

task.series = async function (tasks) {
    for (const t of tasks) await task.run(t)
}

task.plugin = function (fn) {
    return function (input, output, options) {
        mkdirp.sync(path.dirname(output))
        console.log(`  ${input} -> ${output}`)
        return fn(input, output, options)
    }
}

const _start = Date.now()
process.on('exit', () => {
    let delta = (Date.now() - _start) / 1000
    console.log(`\nDone in ${delta.toFixed(2)}s`)
})

function cached (fn) {
    return function (file, content) {
        if (content) cached[file] = content
        else if (cached[file]) return cached[file]
        return fn(file, content)
    }
}

const _read = promisify(fs.readFile)
const _write = promisify(fs.writeFile)
const read = cached((file) => _read(file).then(s => s.toString()))
const write = cached((file, content) => _write(file, content))

module.exports = {
    task,
    read,
    write
}
