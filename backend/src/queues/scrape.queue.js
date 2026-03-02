const { Queue } = require('bullmq');
const redis = require('../config/redis');

const scrapeQueue = new Queue('scrape-company', { connection: redis });

module.exports = scrapeQueue;
