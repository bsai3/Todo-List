const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


app.get('/get', (req, res) => {
    TodoModel.find() 
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.put('/update/:id', (req, res) => { 
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: done }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
      .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is Running");
});
