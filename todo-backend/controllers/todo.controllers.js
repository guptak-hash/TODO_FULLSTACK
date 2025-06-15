const redis = require('../config/redis');
const TodoModel = require('../models/todo.model')
const UserModel = require("../models/user.model");


const newTodo = async (req, res) => {
    try {
        const { email, userId } = req;
        // If no existing booking, create a new one
        const todo = await TodoModel.create({
            ...req.body,
            createdBy: userId
        });
        res.status(200).json({ msg: 'Todo created success', todo })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
};

const getTodos = async (req, res) => {
    try {
        const { email, userId } = req;
        // first check data is present in cache
        let todos;
        let cacheData = await redis.get(userId);
        if (!cacheData) {
            // if data not in cache, fetch data from DB
            todos = await TodoModel.find({ createdBy: userId });
            if (!todos.length) return res.status(400).json({ msg: "Todo not found" })
            // set data in cache
            // key is userId of user
            await redis.set(userId, JSON.stringify(todos), 'EX', 60*3);
            // now send data
            res.status(200).json({ msg: 'Todo list...DB', todos })
        } else {
            // if data present in cache
            todos = JSON.parse(cacheData)
            res.status(200).json({ msg: 'Todo list...Redis', todos })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Id >> ', id)
        const { title, status, description } = req.body;
        const todo = await TodoModel.findById(id);
        console.log('todo >> ', todo)
        if (!todo) return res.status(400).json({ msg: "Todo not found" })
        if (title) {
            todo.title = title
        };
        if (status) {
            todo.status = status;
        };
        if (description) {
            todo.description = description;
        }
        await todo.save();
        res.status(200).json({ msg: "Todo update success", todo })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
};

// delete todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodoModel.findById(id);
        if (!todo) return res.status(400).json({ msg: "Todo not found" });
        const deleteTodo = await TodoModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Todo deleted success", deleteTodo })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
};


module.exports = { newTodo, getTodos, updateTodo, deleteTodo };