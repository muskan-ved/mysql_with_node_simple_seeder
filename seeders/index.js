const mysql = require("mysql2")
const fs = require("fs")
// const bcrypt = require("bcryptjs")

// Load .env variables
require("dotenv").config();

// Read SQL seed query
const seedQuery = fs.readFileSync("db/seeding.sql", {
  encoding: "utf-8",
})

// Connect to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
//   multipleStatements: true, // IMPORTANT
})

// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");
//   })

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nodeConnectivity",
//   });
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// Generate random password for initial admin user
// const psw = Math.random()
//   .toString(36)
//   .substring(2)
// const hash = bcrypt.hashSync(psw, 10)

// console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, err => {
  if (err) {
    throw err
  }

  console.log("SQL seed completed! Database created")
  connection.end()
})