import { registerAs } from '@nestjs/config';

const { host, port } = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
};

export default registerAs('redisConfig', () => ({
  host,
  port,
}));
