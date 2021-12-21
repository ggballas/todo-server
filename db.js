// const mysql = require('mysql');
// const Postgrator = require('postgrator')
// const path = require('path');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'my_db',
//   port: 3306
// });
// exports.pool = pool;

// const query = (sql) => new Promise((res, rej) => {
//   pool.query(sql, (err, results) => {
//     if (err) {
//       rej(err);
//     } else {
//       res(results);
//     }
//   })
// })
// exports.query = query;

// const postgrator = new Postgrator({
//   migrationDirectory: path.resolve(__dirname, './migrations'),
//   driver: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   database: 'my_db',
//   username: 'root',
//   password: 'root',
//   schemaTable: 'migrations',
// });

// exports.migrate = function () {
//   return postgrator.migrate();
// };

///////////////////////////////////////


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

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'my_db'
 });
exports.pool = pool;


const filepath = __dirname + '/todos.json';

exports.getAllTodos = async () => {
  let text = await fs.readFile(filepath);
  return JSON.parse(text);
}

exports.retrieveTodo = async (id) => {
  let todos = await getAllTodos();
  return todos.find((todo) => todo.id==id);
};

exports.addTodo = async (text) => {
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

exports.deleteTodo = async (id) => {
  let todos = await getAllTodos();
  let todosExcludingTodoToDelete = todos.filter((todo) => todo.id!=id);

  await fs.writeFile(filepath, JSON.stringify(todosExcludingTodoToDelete));

  return todosExcludingTodoToDelete;
}
