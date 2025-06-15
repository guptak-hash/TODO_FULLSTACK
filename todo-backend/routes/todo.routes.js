const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { newTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo.controllers');


const TodoRouter=express.Router();

// create new todo
TodoRouter.post('/todo',authMiddleware,newTodo);

// get todos
TodoRouter.get('/todos',authMiddleware,getTodos);

// update todo
TodoRouter.put('/todo/:id',authMiddleware,updateTodo);

// delete todo
TodoRouter.delete('/todo/:id',authMiddleware,deleteTodo);

module.exports=TodoRouter;