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

  static updateResetToken(email, resetToken) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "UPDATE users SET reset_token = ? WHERE email = ?",
        [resetToken, email],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static updatePasswordAndResetToken(email, password, resetToken) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "UPDATE users SET password = ?, reset_token = ? WHERE email = ?",
        [password, resetToken, email],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  static isRecruiterVerified(userId) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT verified FROM employers WHERE user_id = ?",
        [userId],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          // Check if there is a corresponding record in the employers table
          const isVerified = results.length > 0 && results[0].verified === 1;
          resolve(isVerified);
        }
      );
    });
  }
}

module.exports = User;
