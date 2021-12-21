const S = require('fluent-json-schema');

const todosPostSchema = S.object()
  .prop('text', S.string().minLength(1).required())
  .valueOf();

module.exports = {
  todosPostSchema: todosPostSchema
};