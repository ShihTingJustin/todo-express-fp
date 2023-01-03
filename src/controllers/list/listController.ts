import { Request, Response } from 'express';
import { getListByListId } from '@Services/listService';

const listController = {
  getListById: async (
    req: Request,
    res: Response<{
      status: string;
      message?: string;
      data: any;
    }>,
  ) => {
    try {
      const data = await getListByListId(req.params.listId);
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default listController;
