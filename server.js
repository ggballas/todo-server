
const express = require('express');
const cors = require('cors');
const { getAllTodos, retrieveTodo, addTodo, deleteTodo } = require('./db');
const path = require('path');

const { jsonValidationMiddleware } = require('./middleware/validations');
const { todosPostSchema } = require('./schemas');

const port = 5500;

const app = express();


if (process.env.NODE_ENV == 'development') {
  const result = require('dotenv').config({
    path: path.join(__dirname, `./.env.development`),
  });
  
  if (result.error) {
    throw new Error(result.error);
  }
}



// Middleware
app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  let todos = await getAllTodos();
  let returnObject = {
    "todos": todos
  }

  res.setHeader('content-type', 'application/json')
  res.send(JSON.stringify(returnObject));
});

app.post('/todos', jsonValidationMiddleware(todosPostSchema), async (req, res) => {
  
  let text = req.body.text;
  
  let createdTodo = await addTodo(text);
  let returnObject = {
    "todo": createdTodo
  };
  
  res.setHeader('content-type', 'application/json');
  res.status(201);
  res.send(JSON.stringify(returnObject));
});

app.delete('/todos/:todoId', async (req, res) => {
  let todoId = req.params.todoId;

  await deleteTodo(todoId);
  
  console.log(`Todo ID ${todoId} is deleted`);
  
  res.status(201);
  res.send('');
});


app.listen(process.env.PORT || port, () => {
  console.log(`Starting server:
NODE_ENV=${process.env.NODE_ENV}
LOG_LEVEL=${process.env.LOG_LEVEL}
DB_HOST=${process.env.DB_HOST}
DB_PORT=${process.env.DB_PORT}
DB_USER=${process.env.DB_USER}
DB_PASSWORD=${process.env.DB_PASSWORD}
JWT_PASSWORD=${process.env.JWT_PASSWORD}
  `);
});