import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { logger } from './lib';
import configureRouter from './routes';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
  logger.error('Failed to connect to the database.');
});
db.once('open', () => {
  logger.info('Successfully connected to the database.');
});

const app = express();

const whitelist = ['localhost'];
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

app.use(bodyParser.json());
app.use(compression());
app.use(configuredCors);
app.use(helmet());
app.use(morgan('combined'));
app.options('*', configuredCors);

configureRouter(app);

export default app;
