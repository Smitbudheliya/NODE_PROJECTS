const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BookMS')
const db = mongoose.connection;
db.once('open', (err) => {
    if (err) {
        console.log(err);
        return;

    }
    console.log('DB is connected successfully');
})
module.exports = db;
