import { openDB } from '../lib/sqlite';

async function setup() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contracts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      payCycle TEXT,
      startDate TEXT,
      endDate TEXT,
      companyName TEXT,
      pay INTEGER,
      payDate TEXT
    )
  `);
  console.log('Database and table created');
}

setup().catch((err) => {
  console.error('Error during database setup:', err);
});
