import express, { Request, Response } from 'express';
import todoController from '@Controllers/todo/todoController';

const todoRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /todo:
 *    get:
 *      summary: Get List and todos by user
 *      tags:
 *        - todo
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.get('/', todoController.getTodos);


/**
 * @swagger
 * paths:
 *  /todo/search/{keyword}:
 *    get:
 *      summary: Search todo
 *      tags:
 *        - todo
 *      parameters:
 *        - in: path
 *          name: keyword
 *          schema:
 *            type: string
 *          required: true
 *          description: keyword for searching
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.get('/search/:keyword', todoController.searchTodo);

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
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              listId:
 *                type: string
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
todoRouter.post('/', todoController.createTodo);

/**
 * @swagger
 * paths:
 *  /todo:
 *    put:
 *      summary: Update a todo
 *      tags:
 *        - todo
 *      requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: string
 *              title:
 *                type: string
 *              completed:
 *                type: boolean
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
todoRouter.put('/', todoController.updateTodo);

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
todoRouter.delete('/:todoId', todoController.deleteTodo);

export default todoRouter;
