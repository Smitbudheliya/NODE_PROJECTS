const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://smit:smit7768@cluster0.axybcb4.mongodb.net/cookie')

const db = mongoose.connection;

db.once('open',(err) => {
    if(err){
        console.log(err);
    }
    console.log('mongodb is Database');
    
})
module.exports = db