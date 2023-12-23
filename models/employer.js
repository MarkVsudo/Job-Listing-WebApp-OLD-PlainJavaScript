const dbConnection = require("../config/db-config");

class Employer {
  static createEmployer(employer) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "INSERT INTO employers SET ?",
        employer,
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }
}

module.exports = Employer;
