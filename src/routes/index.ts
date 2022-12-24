import express from 'express';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '@Config/swagger';

import todoRouter from './todo';
import listRouter from './list';

const allRouter = express.Router();

allRouter.use('/todo', todoRouter);
allRouter.use('/list', listRouter);
allRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

export default allRouter;
