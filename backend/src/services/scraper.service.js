const { chromium } = require('playwright');
const pool = require('../db/pool');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrapePublicPortal({ companyIdentifier, url, retries = 2 }) {
  let browser;
  for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
    try {
      browser = await chromium.launch({ headless: true });
      const page = await browser.newPage({ userAgent: process.env.PUBLIC_USER_AGENT });
      await sleep(500 * attempt);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const html = await page.content();
      await pool.query(
        'INSERT INTO scraping_logs(company_identifier, source, action, status, message) VALUES ($1,$2,$3,$4,$5)',
        [companyIdentifier, new URL(url).hostname, 'scrape', 'SUCCESS', `Attempt ${attempt}`]
      );
      return { html };
    } catch (error) {
      await pool.query(
        'INSERT INTO scraping_logs(company_identifier, source, action, status, message) VALUES ($1,$2,$3,$4,$5)',
        [companyIdentifier, url, 'scrape', 'FAILED', `Attempt ${attempt}: ${error.message}`]
      );
      if (attempt > retries) throw error;
      await sleep(1000 * attempt);
    } finally {
      if (browser) await browser.close();
    }
  }
}

module.exports = { scrapePublicPortal };
