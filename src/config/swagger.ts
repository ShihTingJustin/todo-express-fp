import swaggerJsDoc from 'swagger-jsdoc';

const swaggerConfig: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Server',
      version: '1.0.0',
      description: '',
    },
  },
  apis: [`./src/routes/*.ts`],
};

export default swaggerConfig;
