const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET || 'unsafe-dev-secret',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  mcaBaseUrl: process.env.MCA_BASE_URL || 'https://www.mca.gov.in',
  userAgent: process.env.PUBLIC_USER_AGENT || 'FASTFINSURE-Bot/1.0',
};
