const mysql = require("mysql");
const fs = require("fs");

// Load .env variables
require("dotenv").config();
const port = process.env.PORT;

// Read SQL seed query
const seedQueryForTable = fs.readFileSync("db/tableCreate.sql", {
  encoding: "utf-8",
});
const seedQueryForDB = fs.readFileSync("db/dbCreate.sql", {
  encoding: "utf-8",
});

// Connect to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected! server started on ${port}`);
});

// Run seed query
connection.query(seedQueryForDB, (err, rows) => {
  if (err) {
    console.log(err.message,"database create query failed")
  }

  console.log("Database Created Successfully !");
  let useQuery = `USE ${process.env.DB_NAME}`;
  connection.query(useQuery, (err, rows) => {
    if (err) {
     console.log(err.message,"use query failed")
    }
    console.log("Using database", useQuery);
    connection.query(seedQueryForTable, (err, rows) => {
      if (err) {
        console.log(err.message,"table create query failed")
      }
      console.log("Using", process.env.DB_NAME, "database table created!");
      connection.end()
    });
  });
});
