import { Request, Response } from 'express';
import { CreateTodoReqBody, UpdateTodoReqBody, SearchTodoBody } from '@Interfaces/I_todo';
import {
  getListAndTodoByUserService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
  searchTodoService,
} from '@Services/todoService';

interface CustomRequest<T> extends Request {
  body: T;
}

const todoController = {
  getTodos: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data: any;
    }>,
  ) => {
    try {
      const data = await getListAndTodoByUserService();
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {}
  },
  searchTodo: async (
    req: CustomRequest<SearchTodoBody>,
    res: Response<{
      status: string;
      message?: string;
      data?: any;
    }>,
  ) => {
    try {
      const { keyword } = req.body;
      const data = await searchTodoService(keyword);

      return res.status(200).json({
        status: 'success',
        data,
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
    }>,
  ) => {
    try {
      const result = await createTodoService(req.body);
      if (result) {
        return res.status(200).json({
          status: 'success',
        });
      } else {
        return res.status(503).json({
          status: 'error',
          message: 'Service Unavailable',
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
    }>,
  ) => {
    try {
      // TODO: validation
      const result = await updateTodoService(req.body);
      if (result) {
        return res.status(200).json({
          status: 'success',
        });
      } else {
        return res.status(503).json({
          status: 'error',
          message: 'Service Unavailable',
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
  deleteTodo: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
    }>,
  ) => {
    try {
      // TODO: validation

      const result = await deleteTodoService(req.params.todoId);
      if (result) {
        return res.status(200).json({
          status: 'success',
        });
      } else {
        return res.status(503).json({
          status: 'error',
          message: 'Service Unavailable',
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
