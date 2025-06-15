const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: String,
    createdBy: String,
    status: { type: String, enum: ['pending','completed'], default: 'pending' }
});

const TodoModel = mongoose.model('todo', todoSchema);

module.exports = TodoModel;