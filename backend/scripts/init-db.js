const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '..', 'sql', 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('Database initialized');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
