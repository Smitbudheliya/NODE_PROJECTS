const express = require('express');
const path = require('path');
const db = require('./config/db');
const Todo = require('./models/todoModel');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); //req.body maate
app.set('view engine', 'ejs'); // EJS template engine
app.set('views', path.join(__dirname, 'views'));


app.get('/', async (req, res) => {
    res.render('todo');
});

app.post('/add', async (req, res) => {
    const { task, type } = req.body;
    await Todo.create({ task, type });
    res.redirect('/');
});

app.get('/show', async (req, res) => {
    const todos = await Todo.find();
    return res.render('show', {
        todos: todos
    });
});

app.post('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/show');
});

app.get('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render('edit', { todo });
});

app.post('/edit/:id', async (req, res) => {
    const { task, type } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { task, type });
    res.redirect('/show');
});


app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});
