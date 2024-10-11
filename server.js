//Import some dependencies/ packages

// Express Frameworks-  Handling HTTP requsts and responses
const express = require("express");
// Create an instance of the framework
const app = express();
// BBMS Mysql
const mysql = require("mysql2");
// Cross Origin Resource Sharing
const cors = require("cors");
// Environment variable
const dotenv = require("dotenv");

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// check for a connection
db.connect((err) => {
  // If no connection = don't connect
  if (err) return console.log("Error connecting to MYSQL");

  //If connected = Connected
  console.log("Connected to Mysql as id: ", db.threadId);
});

// GET method example below
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Question 1 goes here
app.get("/patients", (req, res) => {
  // Retrieve data from database
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // Display the patients record
      res.render("patients", { results: results });
    }
  });
});

// Question 2 goes here
app.get("/providers", (req, res) => {
  // Retrieve data from database
  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // Display the patients record
      res.render("providers", { results: results });
    }
  });
});

// Question 3 goes here
app.get("/patients-firstName", (req, res) => {
  // Retrieve data from database
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // Display the patients record
      res.render("patients-firstName", { results: results });
    }
  });
});

// Question 4 goes here
// Question 3
app.get("/providers-specialty", (req, res) => {
  // Retrieve data from database
  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // Display the patients record
      res.render("providers-specialty", { results: results });
    }
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);

  // Send a mssage to the browser
  console.log("Sending message to browser...");
  app.get("/", (req, res) => {
    res.send("YEY!!! Connection Succesful !!");
  });
});
