import 'dotenv/config';

import app from './app';
import { logger } from './lib';

const { PORT } = process.env;

app.listen(PORT, () => {
  logger.info(`App is now running on port ${PORT}.`);
});
