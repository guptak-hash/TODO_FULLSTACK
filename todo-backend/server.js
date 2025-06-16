const express = require('express');
const UserRouter = require('./routes/user.routes');
const TodoRouter=require('./routes/todo.routes')
const cors = require('cors')
const connectDB = require('./config/db');
require('dotenv').config()

const app = express();
app.use(cors());
connectDB();

app.use(express.json());

app.use('/api',UserRouter);

app.use('/api',TodoRouter);

app.use('/test', (req, res) => {
    res.status(200).json({ msg: 'this is a test route' })
})



app.listen(process.env.PORT, () => {
    console.log('Server started at port ',process.env.PORT)
})