import { Request, Response } from 'express';
import { mockWidgetData, mockLineChartData, mockBarChartData } from './mock/mockOverview';
import { sidebar } from './mock/mockSidebar';

const emsController = {
  getSidebarData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: sidebar,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOverviewWidgetData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: mockWidgetData(),
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOverviewChartData: async (req: Request, res: Response<any>) => {
    try {
      const { dataPoints, interval, type } = req.query;
      console.log(dataPoints, interval, type);
      let data;

      if (type === 'lineSimple') {
        data = mockLineChartData({
          type,
          dataPoints: Number(dataPoints),
          interval: String(interval),
        });
      } else if (type === 'barSimple') {
        data = mockBarChartData({
          type,
          dataPoints: Number(dataPoints),
          interval: String(interval),
        });
      }

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getPowerAnalysisData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: powerAnalysis,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default emsController;
