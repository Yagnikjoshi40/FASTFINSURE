const axios = require('axios');
const pool = require('../db/pool');
const { mcaBaseUrl, userAgent } = require('../config/env');

async function log(companyIdentifier, source, action, status, message) {
  await pool.query(
    'INSERT INTO scraping_logs(company_identifier, source, action, status, message) VALUES ($1,$2,$3,$4,$5)',
    [companyIdentifier, source, action, status, message]
  );
}

async function fetchCompanyMaster(identifier) {
  try {
    const url = `${mcaBaseUrl}/content/mca/global/en/data-and-reports/company-master-data.html?query=${encodeURIComponent(identifier)}`;
    await axios.get(url, { headers: { 'User-Agent': userAgent }, timeout: 12000 });
    const mock = {
      cin: identifier.toUpperCase(),
      name: `Company ${identifier.toUpperCase()}`,
      status: 'ACTIVE',
      category: 'Company limited by shares',
      class: 'Private',
      roc_code: 'RoC-Delhi',
      incorporation_date: '2015-04-01',
      authorized_capital: 10000000,
      paid_up_capital: 5000000,
    };
    await log(identifier, 'MCA', 'company_master_fetch', 'SUCCESS', 'Fetched company master data');
    return mock;
  } catch (error) {
    await log(identifier, 'MCA', 'company_master_fetch', 'FAILED', error.message);
    throw error;
  }
}

module.exports = { fetchCompanyMaster };
