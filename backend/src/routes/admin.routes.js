const express = require('express');
const pool = require('../db/pool');
const { requireAuth, requireRole } = require('../middlewares/auth');

const router = express.Router();
router.use(requireAuth, requireRole('admin'));

router.get('/scraping-logs', async (_req, res) => {
  const rows = (await pool.query('SELECT * FROM scraping_logs ORDER BY created_at DESC LIMIT 200')).rows;
  res.json(rows);
});

router.patch('/risk/:companyId', async (req, res) => {
  const { overall_risk_score, category } = req.body;
  await pool.query('UPDATE risk_scores SET overall_risk_score=$1, category=$2, updated_at=NOW() WHERE company_id=$3', [overall_risk_score, category, req.params.companyId]);
  res.json({ ok: true });
});

module.exports = router;
