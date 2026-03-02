const express = require('express');
const { z } = require('zod');
const pool = require('../db/pool');
const scrapeQueue = require('../queues/scrape.queue');
const { fetchCompanyMaster } = require('../services/mca.service');
const { upsertCompany, insertFinancials } = require('../services/normalization.service');
const { computeRatios } = require('../services/ratio.service');
const { computeRisk } = require('../services/risk.service');
const { generatePdf } = require('../services/report.service');

const router = express.Router();

router.post('/ingest', async (req, res, next) => {
  try {
    const schema = z.object({ identifier: z.string().min(3) });
    const { identifier } = schema.parse(req.body);
    await scrapeQueue.add('scrape', { identifier });
    const master = await fetchCompanyMaster(identifier);
    const company = await upsertCompany(master);
    await insertFinancials(company.id, [
      { fiscal_year: 2022, revenue: 60000000, ebitda: 9000000, net_profit: 4000000, total_assets: 45000000, total_liabilities: 26000000, total_equity: 19000000, interest_expense: 1500000, current_assets: 20000000, current_liabilities: 12000000, inventory: 3000000, receivables: 7000000, payables: 4000000, cash: 3500000 },
      { fiscal_year: 2023, revenue: 69000000, ebitda: 11000000, net_profit: 5000000, total_assets: 51000000, total_liabilities: 29000000, total_equity: 22000000, interest_expense: 1700000, current_assets: 24000000, current_liabilities: 13000000, inventory: 3500000, receivables: 8500000, payables: 5000000, cash: 4200000 }
    ]);
    await computeRatios(company.id);
    const risk = await computeRisk(company.id);
    return res.json({ company, risk });
  } catch (e) { return next(e); }
});

router.get('/:cin', async (req, res) => {
  const { cin } = req.params;
  const company = (await pool.query('SELECT * FROM companies WHERE cin=$1', [cin])).rows[0];
  if (!company) return res.status(404).json({ error: 'Not found' });
  const ratios = (await pool.query('SELECT * FROM ratios WHERE company_id=$1 ORDER BY fiscal_year DESC', [company.id])).rows;
  const risk = (await pool.query('SELECT * FROM risk_scores WHERE company_id=$1', [company.id])).rows[0];
  return res.json({ company, ratios, risk });
});

router.post('/:cin/report', async (req, res) => {
  const company = (await pool.query('SELECT * FROM companies WHERE cin=$1', [req.params.cin])).rows[0];
  if (!company) return res.status(404).json({ error: 'Not found' });
  const reportPath = await generatePdf(company.id);
  return res.download(reportPath);
});

module.exports = router;
