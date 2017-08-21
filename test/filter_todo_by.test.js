import test from 'ava'
import filterTodoBy from '../src/filter_todo_by'

const list = [
    {name: 'tarea 1', done: false}, 
    {name: 'tarea 2', done: true},
    {name: 'tarea 3', done: true}
]

test('With no filter return the same', t => {
    const filtered = filterTodoBy(list, null)
    t.deepEqual(filtered, list)
})

test('With an filter that is not a function', t => {
    const error = t.throw(() => {
        const filtered = filterTodoBy(list, 'no una funcion')
    }, Error)
    t.is(error.message, 'filter must be a function')
})

test('With filter done true', t => {
    const filter = (todo) => todo.done === true
    const filtered = filterTodoBy(list, filter)
    t.deepEqual(filtered, [
        {name: 'tarea 2', done: true},
        {name: 'tarea 3', done: true}
    ])
})

test('With filter done false', t => {
    const filter = (todo) => todo.done === false
    const filtered = filterTodoBy(list, filter)
    t.deepEqual(filtered, [
        {name: 'tarea 1', done: false}
    ])
})