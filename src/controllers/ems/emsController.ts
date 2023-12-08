import { Request, Response } from 'express';

const emsController = {
  getOverviewData: async (req: Request, res: Response<any>) => {
    try {
      const data = {
        overview: [],
      };
      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default emsController;
