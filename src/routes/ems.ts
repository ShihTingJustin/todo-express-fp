import express from 'express';
import emsController from '@Controllers/ems/emsController';

const emsRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /ems/sidebar:
 *    get:
 *      summary: Get sidebar data
 *      tags:
 *        - EMS
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/sidebar', emsController.getSidebarData);

/**
 * @swagger
 * paths:
 *  /ems/table:
 *    get:
 *      summary: Get table data
 *      tags:
 *        - EMS
 *      parameters:
 *        - in: query
 *          name: dataPoints
 *          schema:
 *          type: integer
 *          required: true
 *          default: 3
 *          description: dataPoints for table
 *        - in: query
 *          name: type
 *          schema:
 *          type: string
 *          default: data
 *          required: true
 *          description: type for table
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/table', emsController.getTableData);

/**
 * @swagger
 * paths:
 *  /ems/overview/widget:
 *    get:
 *      summary: Get overview widget data
 *      tags:
 *        - EMS
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/overview/widget', emsController.getOverviewWidgetData);

/**
 * @swagger
 * paths:
 *  /ems/overview/chart:
 *    get:
 *      summary: Get overview chart data
 *      tags:
 *        - EMS
 *      parameters:
 *        - in: query
 *          name: dataPoints
 *          schema:
 *          type: integer
 *          required: true
 *          default: 30
 *          description: dataPoints for chart
 *        - in: query
 *          name: interval
 *          schema:
 *          type: string
 *          default: day
 *          required: true
 *          description: interval for chart
 *        - in: query
 *          name: type
 *          schema:
 *          type: string
 *          default: lineSimple
 *          required: true
 *          description: type for chart
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/overview/chart', emsController.getOverviewChartData);

/**
 * @swagger
 * paths:
 *  /ems/overview/summary:
 *    get:
 *      summary: Get overview summary data
 *      tags:
 *        - EMS
 *      parameters:
 *        - in: query
 *          name: dataPoints
 *          schema:
 *          type: integer
 *          required: false
 *          default: 30
 *          description: dataPoints for summary
 *        - in: query
 *          name: interval
 *          schema:
 *          type: string
 *          default: day
 *          required: false
 *          description: interval for summary
 *        - in: query
 *          name: type
 *          schema:
 *          type: string
 *          default: lineSimple
 *          required: false
 *          description: type for summary
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/overview/summary', emsController.getOverviewSummaryData);

/**
 * @swagger
 * paths:
 *  /ems/power-analysis/widget:
 *    get:
 *      summary: Get power-analysis widget data
 *      tags:
 *        - EMS
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/power-analysis/widget', emsController.getPowerAnalysisWidgetData);

/**
 * @swagger
 * paths:
 *  /ems/power-analysis/chart:
 *    get:
 *      summary: Get power-analysis data
 *      tags:
 *        - EMS
 *      parameters:
 *        - in: query
 *          name: dataPoints
 *          schema:
 *          type: integer
 *          required: true
 *          default: 30
 *          description: dataPoints for chart
 *        - in: query
 *          name: interval
 *          schema:
 *          type: string
 *          default: day
 *          required: true
 *          description: interval for chart
 *        - in: query
 *          name: type
 *          schema:
 *          type: string
 *          select: [sankeySimple, pie, barSimple, barGroup]
 *          default: sankeySimple
 *          required: true
 *          description: type for chart
 *        - in: query
 *          name: subType
 *          schema:
 *          type: string
 *          placeholder: surplus
 *          required: false
 *      responses:
 *        "200":
 *          description: success
 *        "400":
 *          description: bad request
 *        "500":
 *          description: unknown error
 */
emsRouter.get('/power-analysis/chart', emsController.getPowerAnalysisChartData);

export default emsRouter;
