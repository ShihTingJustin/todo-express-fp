import allRouter from '@Routes/index';
import swaggerJsDoc from 'swagger-jsdoc';

let HOST = process.env.HOST || 'localhost:3000';

const swaggerConfig: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Server',
      version: '1.0.0',
      description: '',
      servers: [HOST],
    },
  },
  apis: [`./src/routes/*.ts`],
};

export default swaggerConfig;
