const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cron = require('node-cron');
const TodoModel = require('../models/todo.model');

const addUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(200).json({ msg: 'User signup success', user })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exits;
        // finOne() will return Object, find() will return array of objects
        const user = await UserModel.findOne({ email });
        // console.log('user >> ',user)
        if (!user) return res.status(400).json({ msg: "User doesn't exist. Please sign up" });
        // compare password 
        if (user.password !== password) return res.status(400).json({ msg: "Wrong password" });
        // if not matched return
        // generate jwt access token valid for 15 minutes
        const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: 60*2 }); // token valid for  secs
         res.status(200).json({ 
            success: true,
            message: 'User login success', 
            token: accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
                // Don't send password back!
            }
        });

        // After login success, console pending todos of logged user
        // get id by using email
        // Schedule a cron job to log pending todos every 10 seconds
        let cronJob = cron.schedule('*/2 * * * *', async () => {
            try {
                const pendingTodos = await TodoModel.find({
                    createdBy: user._id,  // Match todos by user ID
                    status: 'pending'
                });
                console.log('Pending Todos:', pendingTodos.map(todo => todo.title));
            } catch (err) {
                console.error('Cron job error:', err.message);
            }
        });

        // Stop the cron job after 1 minute (60000 ms)
        setTimeout(() => {
            cronJob.stop();
            console.log('Cron job stopped.');
        }, 60*5*1000);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}



module.exports = { addUser, loginUser }