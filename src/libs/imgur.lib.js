import imgur from 'imgur';

const {
  IMGUR_CLIENT_ID,
  IMGUR_USERNAME,
  IMGUR_PASSWORD,
}= process.env;

imgur.setCredentials(IMGUR_USERNAME, IMGUR_PASSWORD, IMGUR_CLIENT_ID);

export default imgur;
