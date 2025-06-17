// const redis = require('../config/redis');

const redisClient = require('../config/redis');
const TodoModel = require('../models/todo.model')
const UserModel = require("../models/user.model");


const newTodo = async (req, res) => {
    try {
        const { userId } = req; // Get userId from authenticated request
        const { title, description } = req.body;

        // 1. Validate input
        if (!title || typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Title is required and must be a string",
                field: "title"
            });
        }

        // 2. Create todo
        const todo = await TodoModel.create({
            title,
            status: 'Pending',
            createdBy: userId
        });

        // 3. Invalidate Redis cache
        await redisClient.del(userId);

        // 4. Return success response
        return res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            todo: {
                _id: todo._id,
                title: todo.title,
                description: todo.description,
                status: todo.status,
                // createdAt: todo.createdAt
            }
        });

    } catch (err) {
        console.error('Create todo error:', err);
        
        // Handle duplicate key or other MongoDB errors
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Todo with this title already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to create todo',
            error:  err.message 
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const { userId } = req; // Get userId from authenticated request
        
        // First check Redis cache
        let todos;
        const cacheData = await redisClient.get(userId);
        
        if (!cacheData) {
            // Cache miss - fetch from database
            todos = await TodoModel.find({ createdBy: userId });
            
            if (!todos.length) {
                return res.status(200).json({ 
                    success: true,
                    message: "No todos found",
                    todos: []
                });
            }
            
            // Set in Redis with 3 minute expiry
            await redisClient.set(userId, JSON.stringify(todos), 'EX', 180);
            
            return res.status(200).json({ 
                success: true,
                message: 'Todos retrieved from database',
                source: 'database',
                todos,
                count: todos.length
            });
        } else {
            // Cache hit
            todos = JSON.parse(cacheData);
            return res.status(200).json({ 
                success: true,
                message: 'Todos retrieved from cache',
                source: 'redis',
                todos,
                count: todos.length
            });
        }
        
    } catch (err) {
        console.error('Get todos error:', err);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};

// const updateTodo = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('Id >> ', id)
//         const { title, status, description } = req.body;
//         const todo = await TodoModel.findById(id);
//         console.log('todo >> ', todo)
//         if (!todo) return res.status(400).json({ msg: "Todo not found" })
//         if (title) {
//             todo.title = title
//         };
//         if (status) {
//             todo.status = status;
//         };
//         if (description) {
//             todo.description = description;
//         }
//         await todo.save();
//         res.status(200).json({ msg: "Todo update success", todo })
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).json({ msg: 'Something went wrong' })
//     }
// };

 const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Todo update success", todo });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req; // Get userId from authenticated request

        // 1. Find the todo and verify ownership
        const todo = await TodoModel.findOne({ _id: id, createdBy: userId });
        if (!todo) {
            return res.status(404).json({ 
                success: false,
                message: "Todo not found or you don't have permission to delete it"
            });
        }

        // 2. Delete the todo
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        
        // 3. Invalidate Redis cache
        await redisClient.del(userId);

        // 4. Return success response
        return res.status(200).json({ 
            success: true,
            message: 'Todo deleted successfully',
            deletedId: id,
            deletedTodo
        });

    } catch (err) {
        console.error('Delete todo error:', err);
        return res.status(500).json({ 
            success: false,
            message: 'Failed to delete todo',
            error: err.message
        });
    }
};


module.exports = { newTodo, getTodos, updateTodo, deleteTodo };