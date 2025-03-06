import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
const db = new sqlite3.Database('C:/Users/eesco/OneDrive/Desktop/Senior Design Project/electron-app-svelte-seniordesign/project.db');

function authenticateUser(username, password, callback) {
    console.log(`Authenticating user: ${username}`);
    db.get("SELECT username, password FROM Users WHERE username = ?", [username], (err, row) => {
      if (err) {
        console.log(`Database error:`, err);
        return callback(err);
      }
      if (!row) {
        console.log(`User not found: ${username}`);
        return callback(null, false);
      }
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
            console.log(`Bcrypt error:`, err);
            return callback(err);
        }
        console.log(`Password match:`, result);
        callback(null, result);
      });
    });
}
function addUser(username, password, callback) {
    console.log(`Adding user: ${username}`);
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return callback(err);
      }
      db.run("INSERT INTO Users (username, password) VALUES (?, ?)", [username, hash], function(err) {
        if (err) {
          console.error('Database error:', err);
          return callback(err);
        }
        callback(null, { uid: this.lastID, username });
      });
    });
  }
  
export {db};
export {authenticateUser};
export {addUser};