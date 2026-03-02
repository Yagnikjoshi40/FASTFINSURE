const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

async function generatePdf(companyId) {
  const company = (await pool.query('SELECT * FROM companies WHERE id=$1', [companyId])).rows[0];
  const ratios = (await pool.query('SELECT * FROM ratios WHERE company_id=$1 ORDER BY fiscal_year DESC LIMIT 3', [companyId])).rows;
  const risk = (await pool.query('SELECT * FROM risk_scores WHERE company_id=$1', [companyId])).rows[0];

  const html = `<!doctype html><html><body style="font-family:Arial;padding:28px;">
    <h1>FASTFINSURE Corporate Intelligence Report</h1>
    <p>Timestamp: ${new Date().toISOString()}</p>
    <h2>${company.name} (${company.cin})</h2>
    <p>Status: ${company.status} | Category: ${company.category}</p>
    <h3>Risk: ${risk?.overall_risk_score || 0} (${risk?.category || 'N/A'})</h3>
    <h3>Recent Ratios</h3>
    <pre>${JSON.stringify(ratios, null, 2)}</pre>
    <hr /><p style="opacity:0.6;">Disclaimer: Public data only. Internal score for screening purposes.</p>
    <div style="position:fixed;top:45%;left:20%;opacity:0.15;font-size:64px;transform:rotate(-30deg);">FASTFINSURE</div>
  </body></html>`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  const reportsDir = path.join(process.cwd(), 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outFile = path.join(reportsDir, `${company.cin}.pdf`);
  await page.pdf({ path: outFile, format: 'A4', printBackground: true });
  await browser.close();
  return outFile;
}

module.exports = { generatePdf };
