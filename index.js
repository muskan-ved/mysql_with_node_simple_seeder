const mysql = require("mysql");
var express = require('express');

const app = express();
const port = 6010;

const connection = mysql.createConnection({
  host: "http://192.168.168.30/",
  user: "root",
  password: "mangoit",
  database: "pipeline_testing",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected! server started on ${port}`);
});


app.get('/',function(req,res){
    res.send('success coonect')
})


app.listen(port,()=>{
    console.log(`server started on ${port}`);
})

connection.query(
  "CREATE TABLE testing (id int(11) NOT NULL AUTO_INCREMENT, name varchar(50), city varchar(50), PRIMARY KEY (id))",
  (err, rows) => {
    if (err) console.log(err.sqlMessage, "error creating");
    else console.log(rows, "rows");
  }
);

connection.query(
  "INSERT INTO authors (id, name, city) VALUES (5, 'Michaela Lehr', 'Berlin'),(2, 'Michael Wanyoike', 'Nairobi'),(3, 'James Hibbard', 'Munich'),(4, 'Karolina Gawron', 'Wrocław')",
  (err, rows) => {
    if (err) console.log(err.sqlMessage, "error creating");
    else console.log(rows, "rows");
  }
);

connection.query("SELECT * FROM authors", (err, rows) => {
  if (err) throw err;

  console.log("Data received from Db:");
  console.log(rows);
});
