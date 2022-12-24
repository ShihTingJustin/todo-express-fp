import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import allRouter from './routes';

const app: Express = express();
const PORT = process.env.PORT || 3000;

require('./config/mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(allRouter);

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`);
});
