import 'dotenv/config';

import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`App is now running on port ${PORT}.`);
});
