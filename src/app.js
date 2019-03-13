import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { logger } from './libs';
import { queryParser } from './middlewares';
import configureRouter from './routes';

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', () => {
  logger.error('Failed to connect to the database.');
});
db.once('open', () => {
  logger.info('Successfully connected to the database.');
});

const app = express();

const whitelist = ['http://192.168.1.4:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
const configuredCors = cors(corsOptions);

app.use(bodyParser.json({ limit: '16mb', extended: true }));
app.use(compression());
app.use(process.env.NODE_ENV === 'development' ? configuredCors : cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(queryParser);
app.options(
  '*',
  process.env.NODE_ENV === 'development' ? configuredCors : cors(),
);

configureRouter(app);

export default app;
