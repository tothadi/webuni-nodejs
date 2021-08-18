const loki = require('lokijs');
const db = new loki('./todos.db');

const todos = db.addCollection('todos', {
    indices: ['id', 'todo'],
    unique: ['id', 'todo']
})
module.exports.todos = todos;