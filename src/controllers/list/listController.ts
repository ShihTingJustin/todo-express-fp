import { Request, Response } from 'express';
import List from '@Models/list';

const listController = {
  getAllList: async (req: Request, res: Response) => {
    try {
      const listData = await List.find({}).exec();
      return res.status(200).json({
        status: 'success',
        data: listData,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
};

export default listController;
