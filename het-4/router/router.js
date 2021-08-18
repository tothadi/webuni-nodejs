const express = require('express');
const router = express.Router();
const ctrlTodo = require('../controllers/todoControl');

router.get('/all-todo', ctrlTodo.allTodos);
router.get('/one-todo/:id', ctrlTodo.oneTodo, ctrlTodo.sendTodo);
router.put('/new-todo', ctrlTodo.newTodo);
router.patch('/update-todo/:id', ctrlTodo.oneTodo, ctrlTodo.updateTodo);
router.delete('/delete-todo/:id', ctrlTodo.oneTodo, ctrlTodo.delTodo);
router.post('/search', ctrlTodo.searchTodo);

module.exports = router;