const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./model/bookModel');
const db = require('./config/db');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));  // public/css/style.css
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // uploads folder serve karega

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('addData');
});

app.post('/addData', Book.uploadedImage, async (req, res) => {
    const { name, auther, isbn, genre, total, description } = req.body; // req.body se data milta hai

    await Book.create({
        name,
        auther,
        isbn,
        genre,
        total,
        description,
        profile: req.file ? req.file.filename : null
    });

    res.redirect('/showData');
});

app.get('/showData', async (req, res) => {
    const allData = await Book.find();
    res.render('showData', { data: allData });
});

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});
