
const express = require('express');
const cors = require('cors');
const { getAllTodos, retrieveTodo, addTodo, deleteTodo } = require('./db');

const { jsonValidationMiddleware } = require('./middleware/validations');
const { todosPostSchema } = require('./schemas');

const port = 5500;

const app = express();

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
 
app.listen(port, () => {
  console.log('Starting server');
});
