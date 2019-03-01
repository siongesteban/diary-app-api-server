import 'dotenv/config';

import app from './app';
import { logger } from './lib';

const { PORT } = process.env;

app.listen(PORT, () => {
  logger.error(`App is now running on port ${PORT}.`);
});
