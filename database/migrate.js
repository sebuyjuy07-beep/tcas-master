const db = require('./db');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);
console.log('✅ Migration executed successfully!');
