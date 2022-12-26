import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import allRouter from './routes';

const app: Express = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
require('./config/mongoose');

app.use(
  cors({
    origin: `${process.env.CLIENT_DOMAIN}`,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(allRouter);

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`);
});
