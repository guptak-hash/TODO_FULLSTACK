const express = require('express');
const UserRouter = require('./routes/user.routes');
const TodoRouter=require('./routes/todo.routes')
const connectDB = require('./config/db');
require('dotenv').config()

const app = express();

connectDB();

app.use(express.json());

app.use('/',UserRouter);

app.use('/',TodoRouter);

app.use('/test', (req, res) => {
    res.status(200).json({ msg: 'this is a test route' })
})



app.listen(process.env.PORT, () => {
    console.log('Server started at port ',process.env.PORT)
})