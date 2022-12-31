import express, { Express } from 'express';
import allRouter from './routes';
import { cors, corsOptionsDelegate } from '@Config/cors';
import { db as mongoDBconnection } from '@Config/mongoose';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env.development' });
} else {
  dotenv.config();
}

const app: Express = express();
const PORT = process.env.PORT;
mongoDBconnection;

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(allRouter);

app.listen(PORT, () => {
  console.log(`Express is listening on 127.0.0.1:${PORT}`);
});

export default app;
