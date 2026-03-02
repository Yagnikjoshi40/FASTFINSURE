const pool = require('../db/pool');

function clamp(v) { return Math.max(0, Math.min(100, v)); }

async function computeRisk(companyId) {
  const f = (await pool.query('SELECT * FROM financials WHERE company_id=$1 ORDER BY fiscal_year DESC LIMIT 1', [companyId])).rows[0];
  const r = (await pool.query('SELECT * FROM ratios WHERE company_id=$1 ORDER BY fiscal_year DESC LIMIT 1', [companyId])).rows[0];
  const gst = (await pool.query('SELECT * FROM gst_status WHERE company_id=$1 ORDER BY updated_at DESC LIMIT 1', [companyId])).rows[0];
  const legalCount = Number((await pool.query('SELECT COUNT(*) FROM legal_cases WHERE company_id=$1', [companyId])).rows[0].count);
  const auditorChanges = Number((await pool.query('SELECT COUNT(*) FROM audit_history WHERE company_id=$1', [companyId])).rows[0].count);

  const financial = clamp((f && f.total_equity < 0 ? 30 : 0) + (r && r.debt_equity > 2.5 ? 35 : 0) + (r && r.revenue_growth < 0 ? 20 : 0) + (r && r.debtor_days > 120 ? 15 : 0));
  const compliance = clamp((gst && gst.filing_delay_days > 45 ? 40 : 0) + legalCount * 10 + (r && r.current_ratio < 1 ? 20 : 0));
  const governance = clamp((auditorChanges > 1 ? 40 : 0) + legalCount * 8);
  const overall = clamp((financial * 0.45) + (compliance * 0.35) + (governance * 0.2));
  const category = overall < 25 ? 'Low' : overall < 50 ? 'Moderate' : overall < 75 ? 'High' : 'Critical';

  await pool.query(
    `INSERT INTO risk_scores(company_id,financial_risk_score,compliance_risk_score,governance_risk_score,overall_risk_score,category,notes,updated_at)
     VALUES($1,$2,$3,$4,$5,$6,$7,NOW())
     ON CONFLICT(company_id) DO UPDATE SET
      financial_risk_score=EXCLUDED.financial_risk_score,compliance_risk_score=EXCLUDED.compliance_risk_score,
      governance_risk_score=EXCLUDED.governance_risk_score,overall_risk_score=EXCLUDED.overall_risk_score,
      category=EXCLUDED.category,notes=EXCLUDED.notes,updated_at=NOW()`,
    [companyId, financial, compliance, governance, overall, category, JSON.stringify({ legalCount, auditorChanges })]
  );

  return { financial, compliance, governance, overall, category };
}

module.exports = { computeRisk };
