const { Worker } = require('bullmq');
const redis = require('../config/redis');
const { scrapePublicPortal } = require('../services/scraper.service');

new Worker('scrape-company', async (job) => {
  const { identifier } = job.data;
  await scrapePublicPortal({ companyIdentifier: identifier, url: 'https://www.mca.gov.in' });
}, { connection: redis });

console.log('Scrape worker running');
