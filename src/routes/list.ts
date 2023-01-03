import express from 'express';
import listController from '@Controllers/list/listController';

const listRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /list/{listId}:
 *    get:
 *      summary: Get todos by listId
 *      tags:
 *        - list
 *      parameters:
 *        - in: path
 *          name: listId
 *          schema:
 *            type: string
 *          required: true
 *          description: listId
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
listRouter.get('/:listId', listController.getListById);

export default listRouter;
