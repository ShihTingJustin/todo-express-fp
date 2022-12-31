import { Request } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.development' });
} else {
  dotenv.config();
}

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

export { cors, corsOptionsDelegate };
