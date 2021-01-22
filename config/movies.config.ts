import { registerAs } from '@nestjs/config';

const { host, port, username, password, apiKey } = {
  host: process.env.MOVIES_HOST,
  port: process.env.MOVIES_PORT,
  username: process.env.MOVIES_DB_USERNAME,
  password: process.env.MOVIES_DB_PASSWORD,
  apiKey: process.env.OMDB_API_KEY,
};
export default registerAs('moviesConfig', () => ({
  uri: `mongodb://${username}:${password}@${host}:${port}`,
  baseUrl: 'http://www.omdbapi.com/',
  apiKey,
}));
