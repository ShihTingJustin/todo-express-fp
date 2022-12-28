import express, { Express, Request, Response } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import bodyParser from 'body-parser';
import allRouter from './routes';

const app: Express = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
require('./config/mongoose');

const allowlist = [`${process.env.CLIENT_DOMAIN_1}`, `${process.env.CLIENT_DOMAIN_2}`];
const corsOptionsDelegate: CorsOptionsDelegate<Request> = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('origin') || '') !== -1) {
    corsOptions = { origin: true, preflightContinue: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(allRouter);

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`);
});

export default app;
