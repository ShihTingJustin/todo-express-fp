let HOST = process.env.HOST || 'localhost:3000';

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Server',
      version: '1.0.0',
      description: '',
      servers: [HOST],
    },
  },
  apis: ['./routes/apis.js'],
};

export default swaggerConfig;
