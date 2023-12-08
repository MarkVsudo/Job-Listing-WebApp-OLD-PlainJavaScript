const dbConnection = require("../config/db-config");

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results[0]);
        }
      );
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      dbConnection.query("INSERT INTO users SET ?", user, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = User;
