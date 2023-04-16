import express, { Request, Response } from 'express';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '@Config/swagger';

import todoRouter from './todo';
import listRouter from './list';

const allRouter = express.Router();

allRouter.use('/todo', todoRouter);
allRouter.use('/list', listRouter);
allRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));
allRouter.get('/health', async (_req: Request, res: Response) => {
  const healthCheck = {
    message: 'OK',
    uptime: formatUptime(process.uptime()),
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthCheck);
  } catch (error) {
    healthCheck.message = String(error);
    res.status(503).send('something went wrong');
  }
});

function formatUptime(uptime: number) {
  const days = Math.floor(uptime / 86400);
  uptime %= 86400;
  const hours = Math.floor(uptime / 3600);
  uptime %= 3600;
  const minutes = Math.floor(uptime / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days}天 ${hours}小時 ${minutes}分鐘 ${seconds}秒`;
}

export default allRouter;
