const express = require('express');
const swaggerUi = require('swagger-ui-express');

const fs = require('fs');
const YAML = require('yaml');
const file = fs.readFileSync('./routes/api-docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const apiDocsRouter = express.Router();

apiDocsRouter.use('/', swaggerUi.serve);
apiDocsRouter.get('/', swaggerUi.setup(swaggerDocument));

module.exports = apiDocsRouter
