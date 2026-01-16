const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('mp_tracker.db');

db.serialize(() => {
    db.all("SELECT * FROM projects", (err, rows) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        fs.writeFileSync('projects_dump.json', JSON.stringify(rows, null, 2));
        console.log(`Exported ${rows.length} projects to projects_dump.json`);
    });
});
