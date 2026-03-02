const pool = require('../db/pool');

async function upsertCompany(data) {
  const result = await pool.query(
    `INSERT INTO companies(cin,name,pan,status,incorporation_date,roc_code,category,class,authorized_capital,paid_up_capital,updated_at)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())
     ON CONFLICT(cin) DO UPDATE SET
      name=EXCLUDED.name,pan=EXCLUDED.pan,status=EXCLUDED.status,incorporation_date=EXCLUDED.incorporation_date,
      roc_code=EXCLUDED.roc_code,category=EXCLUDED.category,class=EXCLUDED.class,
      authorized_capital=EXCLUDED.authorized_capital,paid_up_capital=EXCLUDED.paid_up_capital,updated_at=NOW()
     RETURNING *`,
    [data.cin, data.name, data.pan || null, data.status, data.incorporation_date, data.roc_code, data.category, data.class, data.authorized_capital, data.paid_up_capital]
  );
  return result.rows[0];
}

async function insertFinancials(companyId, financialRows) {
  for (const row of financialRows) {
    await pool.query(
      `INSERT INTO financials(company_id,fiscal_year,revenue,ebitda,net_profit,total_assets,total_liabilities,total_equity,interest_expense,current_assets,current_liabilities,inventory,receivables,payables,cash)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT(company_id,fiscal_year) DO UPDATE SET
        revenue=EXCLUDED.revenue,ebitda=EXCLUDED.ebitda,net_profit=EXCLUDED.net_profit,total_assets=EXCLUDED.total_assets,
        total_liabilities=EXCLUDED.total_liabilities,total_equity=EXCLUDED.total_equity,interest_expense=EXCLUDED.interest_expense,
        current_assets=EXCLUDED.current_assets,current_liabilities=EXCLUDED.current_liabilities,inventory=EXCLUDED.inventory,
        receivables=EXCLUDED.receivables,payables=EXCLUDED.payables,cash=EXCLUDED.cash`,
      [companyId, row.fiscal_year, row.revenue, row.ebitda, row.net_profit, row.total_assets, row.total_liabilities, row.total_equity, row.interest_expense, row.current_assets, row.current_liabilities, row.inventory, row.receivables, row.payables, row.cash]
    );
  }
}

module.exports = { upsertCompany, insertFinancials };
