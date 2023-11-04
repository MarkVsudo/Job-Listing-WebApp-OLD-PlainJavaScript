require("dotenv").config();

const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("🛑 Error connecting to the database: " + err.message);
  } else {
    console.log("🤝 Connected to the database successfully");
  }
});

module.exports = connection;
