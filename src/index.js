import 'dotenv/config';

import app from './app';
import { logger } from './libs';

const { PORT } = process.env;

app.listen(PORT, () => {
  logger.info(`Now running on port ${PORT}.`);
});
