import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(compression());

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

app.use(configuredCors);
app.options('*', configuredCors);

app.use(helmet());
app.use(morgan('combined'));

export default app;
