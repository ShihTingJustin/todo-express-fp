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
 *          default: line
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
 *  /ems/power-analysis:
 *    get:
 *      summary: Get power-analysis data
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
emsRouter.get('/power-analysis', emsController.getPowerAnalysisData);

export default emsRouter;
