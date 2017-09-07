const express = require('express');
const morgan = require('morgan');

// configure app to use bodyParser()
// this will let us get the data from a POST
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for our API
// get an instance fo the express Router
// const router = express.Router();

let counter = 0;
let todoArr = [{
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];


// test route to make sure everything is working (accessed at get http://localhost:8484/api)
// do logging - this is where we can do validations or throw errors

app.get('/', function(req, res) {

    res.status(200).json();
});

// do logging - this is where we can do validations or throw errors
// additional routes for our API will happen here
// router.route('/toDoItem')  (since no router use /api/TodoItems as that is acting as the database)

app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(todoArr);
});

app.get('/api/TodoItems/:id', (req, res) => {
    let num = req.params.id;

    for (var i = 0; i < todoArr.length; i++) {
        if (todoArr[i].todoItemId == num) {
            res.status(200).send(todoArr[i]);
        }
    }
});

app.post('/api/TodoItems/', (req, res) => {
    const newTodo = {
        todoItemId: counter,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    }

    todoArr.push(newTodo);
    counter++;

    res.status(201).send(newTodo);
});

app.delete('/api/TodoItems/:id', function(req, res) {
    let deleteObj = [];
    const deleteNum = req.params.id;
    for (i = 0; i < todoArr.length; i++) {
        if (deleteNum == todoArr[i].todoItemId) {
            deleteObj = todoArr.splice(i, 1);
        }
    }

    res.status(200).send(deleteObj[0]);
})

// REGISTER OUR ROUTES-------------------------------------------------
// all routes will be prefixed with /api

module.exports = app;