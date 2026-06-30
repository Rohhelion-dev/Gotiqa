const db = require("./db");

db.query("SELECT id,name,email,role FROM users LIMIT 10")
.then(r => {
  console.table(r.rows);
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
