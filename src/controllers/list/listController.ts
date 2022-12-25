import { Request, Response } from 'express';
import List from '@Models/list';
import { IList } from '@Interfaces/I_list';

const listController = {
  getAllList: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data?: IList[];
    }>,
  ) => {
    try {
      const data = await List.find({}).exec();
      const resData = data.map((item) => ({
        id: item._id,
        title: item.title,
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

export default listController;
