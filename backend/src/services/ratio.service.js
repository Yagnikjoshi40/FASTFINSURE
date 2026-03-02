const pool = require('../db/pool');

function div(a, b) { return b ? Number(a) / Number(b) : 0; }

async function computeRatios(companyId) {
  const { rows } = await pool.query('SELECT * FROM financials WHERE company_id=$1 ORDER BY fiscal_year ASC', [companyId]);
  for (let i = 0; i < rows.length; i += 1) {
    const f = rows[i];
    const prev = rows[i - 1];
    const revenueGrowth = prev ? div(f.revenue - prev.revenue, prev.revenue) * 100 : 0;
    const ebitdaMargin = div(f.ebitda, f.revenue) * 100;
    const netMargin = div(f.net_profit, f.revenue) * 100;
    const roe = div(f.net_profit, f.total_equity) * 100;
    const debtEquity = div(f.total_liabilities, f.total_equity);
    const interestCoverage = div(f.ebitda, f.interest_expense);
    const currentRatio = div(f.current_assets, f.current_liabilities);
    const quickRatio = div(f.current_assets - f.inventory, f.current_liabilities);
    const debtorDays = div(f.receivables, f.revenue) * 365;
    const payableDays = div(f.payables, f.revenue) * 365;
    const ccc = debtorDays - payableDays;

    await pool.query(
      `INSERT INTO ratios(company_id,fiscal_year,revenue_growth,ebitda_margin,net_margin,roe,debt_equity,interest_coverage,current_ratio,quick_ratio,debtor_days,payable_days,cash_conversion_cycle)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT(company_id,fiscal_year) DO UPDATE SET
        revenue_growth=EXCLUDED.revenue_growth,ebitda_margin=EXCLUDED.ebitda_margin,net_margin=EXCLUDED.net_margin,
        roe=EXCLUDED.roe,debt_equity=EXCLUDED.debt_equity,interest_coverage=EXCLUDED.interest_coverage,
        current_ratio=EXCLUDED.current_ratio,quick_ratio=EXCLUDED.quick_ratio,debtor_days=EXCLUDED.debtor_days,
        payable_days=EXCLUDED.payable_days,cash_conversion_cycle=EXCLUDED.cash_conversion_cycle`,
      [companyId, f.fiscal_year, revenueGrowth, ebitdaMargin, netMargin, roe, debtEquity, interestCoverage, currentRatio, quickRatio, debtorDays, payableDays, ccc]
    );
  }
}

module.exports = { computeRatios };
