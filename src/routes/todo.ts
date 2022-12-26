import express, { Request, Response } from 'express';
import todoController from '@Controllers/todo/todoController';

const todoRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /todo/{listId}:
 *    get:
 *      summary: Get todos by listId
 *      tags:
 *        - todo
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
todoRouter.get('/:listId', todoController.getTodoByListId);

/**
 * @swagger
 * paths:
 *  /todo:
 *    post:
 *      summary: Create a todo
 *      tags:
 *        - todo
 *      requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              listId:
 *                type: string
 *                format: uuid
 *              title:
 *                type: string
 *              status:
 *                type: string
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.post('', todoController.createTodo);

/**
 * @swagger
 * paths:
 *  /todo/{todoId}:
 *    put:
 *      summary: Update a todo
 *      tags:
 *        - todo
 *      requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              todoId:
 *                type: string
 *                format: uuid
 *              title:
 *                type: string
 *              status:
 *                type: string
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.put('/:todoId', (req: Request, res: Response) => {
  res.send('update todo');
});

/**
 * @swagger
 * paths:
 *  /todo/{todoId}:
 *    delete:
 *      summary: Delete a todo
 *      tags:
 *        - todo
 *      parameters:
 *        - in: path
 *          name: todoId
 *          schema:
 *            type: string
 *          required: true
 *          description: Numeric ID of the user to get
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.put('/:todoId', (req: Request, res: Response) => {
  res.send('update todo');
});

export default todoRouter;
