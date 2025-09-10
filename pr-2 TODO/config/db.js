const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo')
const db = mongoose.connection;
db.once('open', (err) => {
    if (err) {
        console.error('Connection error:', err);
    }
    console.log('DB connected successfully');
})
module.exports = db;