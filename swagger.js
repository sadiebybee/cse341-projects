const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'My API',
        description: 'Expenses API',
    },
    host: 'cse341-projects-xi6e.onrender.com',
    schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);