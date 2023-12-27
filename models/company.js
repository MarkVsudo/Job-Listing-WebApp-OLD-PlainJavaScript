const dbConnection = require("../config/db-config");

class Company {
  static createCompany(company) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "INSERT INTO companies SET ?",
        company,
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results.insertId); // Return the ID of the newly inserted company
        }
      );
    });
  }
}

module.exports = Company;
