CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  cin VARCHAR(21) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  pan VARCHAR(20),
  status TEXT,
  incorporation_date DATE,
  roc_code TEXT,
  category TEXT,
  class TEXT,
  authorized_capital NUMERIC,
  paid_up_capital NUMERIC,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directors (
  id SERIAL PRIMARY KEY,
  din VARCHAR(20) UNIQUE,
  name TEXT NOT NULL,
  appointment_date DATE,
  compliance_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS director_company_map (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  director_id INT REFERENCES directors(id) ON DELETE CASCADE,
  designation TEXT,
  active BOOLEAN DEFAULT TRUE,
  UNIQUE(company_id, director_id)
);

CREATE TABLE IF NOT EXISTS financials (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  fiscal_year INT NOT NULL,
  revenue NUMERIC DEFAULT 0,
  ebitda NUMERIC DEFAULT 0,
  net_profit NUMERIC DEFAULT 0,
  total_assets NUMERIC DEFAULT 0,
  total_liabilities NUMERIC DEFAULT 0,
  total_equity NUMERIC DEFAULT 0,
  interest_expense NUMERIC DEFAULT 0,
  current_assets NUMERIC DEFAULT 0,
  current_liabilities NUMERIC DEFAULT 0,
  inventory NUMERIC DEFAULT 0,
  receivables NUMERIC DEFAULT 0,
  payables NUMERIC DEFAULT 0,
  cash NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_id, fiscal_year)
);

CREATE TABLE IF NOT EXISTS ratios (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  fiscal_year INT NOT NULL,
  revenue_growth NUMERIC,
  ebitda_margin NUMERIC,
  net_margin NUMERIC,
  roe NUMERIC,
  debt_equity NUMERIC,
  interest_coverage NUMERIC,
  current_ratio NUMERIC,
  quick_ratio NUMERIC,
  debtor_days NUMERIC,
  payable_days NUMERIC,
  cash_conversion_cycle NUMERIC,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_id, fiscal_year)
);

CREATE TABLE IF NOT EXISTS gst_status (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  gstin TEXT,
  filing_delay_days INT DEFAULT 0,
  status TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS charges (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  charge_holder TEXT,
  amount NUMERIC,
  charge_date DATE,
  status TEXT
);

CREATE TABLE IF NOT EXISTS legal_cases (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  case_ref TEXT,
  forum TEXT,
  status TEXT,
  amount_involved NUMERIC
);

CREATE TABLE IF NOT EXISTS epfo_records (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  establishment_code TEXT,
  compliance_status TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shareholding (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  holder_name TEXT,
  holder_type TEXT,
  ownership_percent NUMERIC
);

CREATE TABLE IF NOT EXISTS audit_history (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE,
  auditor_name TEXT,
  changed_on DATE,
  reason TEXT
);

CREATE TABLE IF NOT EXISTS risk_scores (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES companies(id) ON DELETE CASCADE UNIQUE,
  financial_risk_score NUMERIC,
  compliance_risk_score NUMERIC,
  governance_risk_score NUMERIC,
  overall_risk_score NUMERIC,
  category TEXT,
  notes JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scraping_logs (
  id SERIAL PRIMARY KEY,
  company_identifier TEXT,
  source TEXT,
  action TEXT,
  status TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
