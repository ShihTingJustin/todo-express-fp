import { Request, Response } from 'express';
import Todo, { ITodo } from '@Models/todo';
import { CreateTodoReqBody, UpdateTodoReqBody, SearchTodoBody } from '@Interfaces/I_todo';
import {
  checkListIdValid,
  addTodo,
  updateTodoByTodoId,
  searchTodoByFilter,
  groupTodoByList,
  getListByListId,
} from '@Utils/index';
import { getListAndTodoByUser, createTodoService, updateTodoService } from '@Services/todoService';

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
      const data = await getListAndTodoByUser();
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {}
  },
  getTodoByListId: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data?: {
        listTitle: string;
        todo: ITodo[];
      };
    }>,
  ) => {
    try {
      const todoData = await Todo.find({ listId: req.params.listId, isDelete: false }).exec();
      const listData = await getListByListId(req.params.listId);

      if (todoData && listData) {
        const resData = {
          listTitle: listData.title,
          todo: todoData.map((todo) => ({
            id: todo._id,
            title: todo.title,
            listId: todo.listId,
            status: todo.status,
          })),
        };

        return res.status(200).json({
          status: 'success',
          data: resData,
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'not found',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
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
      const data = await searchTodoByFilter({ keyword });

      const groupData = await groupTodoByList(data || []);

      return res.status(200).json({
        status: 'success',
        data: groupData,
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
      data?: ITodo | null;
    }>,
  ) => {
    try {
      const todo = await createTodoService(req.body);
      return res.status(200).json({
        status: 'success',
        data: todo,
      });

      // TODO: error handling
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
  updateTodo: async (
    req: CustomRequest<ITodo>,
    res: Response<{
      status: string;
      message?: string;
      data?: ITodo;
    }>,
  ) => {
    try {
      // TODO: validation
      console.log(req.body);
      const todo = await updateTodoService(req.body);
      if (todo) {
        return res.status(200).json({
          status: 'success',
          data: todo,
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
  deleteTodo: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data?: ITodo;
    }>,
  ) => {
    try {
      // TODO: validation

      const todo = await updateTodoByTodoId(req.params.todoId, { isDelete: true });
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
