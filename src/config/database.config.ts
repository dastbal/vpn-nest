import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  mysql: {
    name: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    host: process.env.HOST,
  },
}));
