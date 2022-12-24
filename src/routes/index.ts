import express from 'express';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '@Config/swagger';

const allRouter = express.Router();

allRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

export default allRouter;
