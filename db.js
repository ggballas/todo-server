
const fs = require('fs').promises;

/**
 * [
 *   {
 *    "id": 123,
 *     "text": "asdf",
 *     "dateCreated": 1234
 *   },
 *   ...
 * ]
 */
const filepath = __dirname + '/todos.json';

const getAllTodos = async () => {
  let text = await fs.readFile(filepath);
  return JSON.parse(text);
}

const retrieveTodo = async (id) => {
  let todos = await getAllTodos();
  return todos.find((todo) => todo.id==id);
};

const addTodo = async (text) => {
  let todos = await getAllTodos();
  let epochDate = Date.now();
  let newTodo = {
    id: epochDate,
    text: text,
    dateCreated: epochDate
  };
  todos.push(newTodo)

  await fs.writeFile(filepath, JSON.stringify(todos));

  return newTodo;
}

const deleteTodo = async (id) => {
  let todos = await getAllTodos();
  let todosExcludingTodoToDelete = todos.filter((todo) => todo.id!=id);

  await fs.writeFile(filepath, JSON.stringify(todosExcludingTodoToDelete));

  return todosExcludingTodoToDelete;
}

module.exports = {
  getAllTodos: getAllTodos,
  retrieveTodo: retrieveTodo,
  addTodo: addTodo,
  deleteTodo: deleteTodo
};