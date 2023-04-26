"use strict"

// https://blog.logrocket.com/documenting-express-js-api-swagger/
import express = require('express');
import swaggerUi = require('swagger-ui-express');
import swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CS 194 Express API with Swagger",
      version: "1.0",
    }
  },
  apis: ["./server.ts", "./routes/**/*.ts", "./schemas/**/*.ts"]
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerRouter = express.Router();

/**
 * @openapi
 * /swagger:
 *   get:
 *     summary: Returns OpenAPI specification of APIs.
 *     responses:
 *       200:
 *         description: Successful retrieval of OpenAPI specification.
 */
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { swaggerRouter };
