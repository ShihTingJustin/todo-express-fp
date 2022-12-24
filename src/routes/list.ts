import express from 'express';
import listController from '@Controllers/list/listController';

const listRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /list:
 *    get:
 *      summary: Get all list
 *      tags:
 *        - list
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
listRouter.get('', listController.getAllList);

export default listRouter;
