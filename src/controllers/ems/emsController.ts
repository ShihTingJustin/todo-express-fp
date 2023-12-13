import { Request, Response } from 'express';
import { mockWidgetData, mockLineChartData, mockBarChartData } from './mock/mockOverview';
import { sidebar } from './mock/mockSidebar';
import {
  powerAnalysis,
  mockSankeyChartData,
  mockPieChartData,
  mockPowerAnalysisWidgetData,
} from './mock/mockPowerAnalysis';

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
  getPowerAnalysisWidgetData: async (req: Request, res: Response<any>) => {
    try {
      return res.status(200).json({
        status: 'success',
        data: mockPowerAnalysisWidgetData(),
      });
    } catch (error) {
      console.log(error);
    }
  },
  getPowerAnalysisChartData: async (req: Request, res: Response<any>) => {
    try {
      const { dataPoints, interval, type } = req.query;
      let data;

      if (type === 'sankeySimple') {
        data = mockSankeyChartData({
          type,
          dataPoints: Number(dataPoints),
          interval: String(interval),
        });
      } else if (type === 'pie') {
        data = mockPieChartData();
      } else if (type === 'barSimple') {
        data = mockBarChartData({
          type: 'barGroup',
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
};

export default emsController;
