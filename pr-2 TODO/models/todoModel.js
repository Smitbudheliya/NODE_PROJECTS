const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    }
});

const todo = mongoose.model('Todo', todoSchema);
module.exports = todo;