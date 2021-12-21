
const Ajv = require("ajv");

const ajv = new Ajv();

/**
 * Given a schema, return a middleware function which validates the input using that schema.
 * @param {object} schema The schema object which I want to create the middleware out of
 * @returns 
 */
const jsonValidationMiddleware = (schema) => {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    let isValid = validate(req.body);
    if (!isValid) {
      res.setHeader('content-type', 'application/json')
      res.status(400);
      res.send(JSON.stringify(validate.errors));
      return;
    }

    next();
  };
};

module.exports = {
  jsonValidationMiddleware: jsonValidationMiddleware
};