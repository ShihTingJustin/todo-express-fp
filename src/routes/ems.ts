import express from 'express';
import emsController from '@Controllers/ems/emsController';

const emsRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /ems/overview:
 *    get:
 *      summary: Get overview data
 *      tags:
 *        - EMS
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/overview', emsController.getOverviewData);

export default emsRouter;
