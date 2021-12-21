const path = require('path');
const Postgrator = require("postgrator");

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, './migrations'),
  driver: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'my_db',
  username: 'root',
  password: 'root',
  schemaTable: 'migrations',
});

postgrator.migrate();
