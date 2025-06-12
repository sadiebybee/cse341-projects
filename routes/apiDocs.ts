import { NextFunction } from "express";

const express = require('express');
const apiDocs = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


apiDocs.use('/', swaggerUi.serve);
apiDocs.get('/', (req: any, res: any, next: NextFunction) => {
    res.setHeader('Content-Type', 'text/html');
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

module.exports = apiDocs;
export {};