import { Request, Response } from 'express';
import Todo from '@Models/todo';
import { ITodo, CreateTodoReqBody, UpdateTodoReqBody } from '@Interfaces/I_todo';
import { checkListIdValid, addTodo } from '@Utils/index';

interface CustomRequest<T> extends Request {
  body: T;
}

const todoController = {
  getTodoByListId: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data?: ITodo[];
    }>,
  ) => {
    try {
      const data = await Todo.find({ listId: req.params.listId }).exec();
      const resData = data.map((item) => ({
        id: item._id,
        title: item.title,
        listId: item.listId,
        status: item.status,
      }));

      return res.status(200).json({
        status: 'success',
        data: resData,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
  createTodo: async (
    req: CustomRequest<CreateTodoReqBody>,
    res: Response<{
      status: string;
      message?: string;
      data?: ITodo;
    }>,
  ) => {
    try {
      // TODO: fp-ts
      const isListIdValid = await checkListIdValid(req.body.listId);

      // TODO: validation

      if (isListIdValid) {
        const todo = await addTodo(req.body);
        return res.status(200).json({
          status: 'success',
          data: todo,
        });
      }

      // TODO: error handling
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
  updateTodo: async (
    req: CustomRequest<UpdateTodoReqBody>,
    res: Response<{
      status: string;
      message?: string;
      data?: ITodo;
    }>,
  ) => {
    try {
      // TODO: validation
      console.log(req.body);
      const { todoId, ...rest } = req.body;
      const update = rest;

      const todo = await Todo.findByIdAndUpdate(todoId, update, { new: true });
      console.log(todo);
      if (todo) {
        return res.status(200).json({
          status: 'success',
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'not found',
        });
      }

      // TODO: error handling
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
};

export default todoController;
