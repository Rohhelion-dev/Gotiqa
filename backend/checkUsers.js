const db = require("./db");

db.query(`
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
`)
.then(r => {
  console.table(r.rows);
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
