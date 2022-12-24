import express, { Request, Response } from 'express';

const todoRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /list:
 *    get:
 *      summary: Get all list
 *      tags:
 *        - list
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: integer
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
todoRouter.get('', (req: Request, res: Response) => {
  res.send('get all list');
});

export default todoRouter;
