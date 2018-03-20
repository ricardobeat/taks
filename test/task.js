const { task, read, write } = require('../')
const test = require('ava')

// test.beforeEach(reset)

test('run task', async t => {
    let ran = false
    task('t1', async function () { ran = true })
    await task.run('t1')
    t.is(ran, true)
    t.pass()
})

test('run series', async t => {
    let state = []
    task('s1', async function () { state.push(1) })
    task('s2', async function () { state.push(2) })
    task('s3', async function () { state.push(3) })

    await task.series(['s3', 's1', 's2'])
    t.deepEqual(state, [3, 1, 2])
    t.pass()
})

test('run parallel', async t => {
    let state = []
    task('p1', async function () { state.push(1) })
    task('p2', async function () { state.push(2) })
    task('p3', async function () { state.push(3) })

    await task.series(['p1', 'p3', 'p2'])
    t.deepEqual(state.sort(), [1, 2, 3])
    t.pass()
})
