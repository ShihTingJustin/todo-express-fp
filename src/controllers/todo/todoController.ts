import { Request, Response } from 'express';
import Todo, { ITodo } from '@Models/todo';

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
};

export default todoController;
