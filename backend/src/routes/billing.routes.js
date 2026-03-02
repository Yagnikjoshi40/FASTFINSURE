const express = require('express');

const router = express.Router();

router.get('/plans', (_req, res) => {
  res.json({
    free: { features: ['Basic Snapshot'] },
    pro: { features: ['Full Report Download'] },
    enterprise: { features: ['API Access', 'Portfolio Monitoring'] }
  });
});

router.post('/checkout', async (req, res) => {
  const { plan } = req.body;
  return res.json({ checkoutUrl: `https://checkout.stripe.com/pay/mock-${plan}` });
});

module.exports = router;
