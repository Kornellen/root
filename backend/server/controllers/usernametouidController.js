const mysql = require("mysql");
const databaseConfig = require("../config/database");
const { hash } = require("../utils/hashPass");

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[DEBUG]:Connected Username -> UID Endpoint");
});

const userToUID = (req, res) => {
  const { username, password } = req.body;

  var sql = "select userID from `logins` where username = ? and password = ?";

  con.query(sql, [username, hash(password)], (err, result) => {
    err ? console.error(err) : res.json(result);
  });
};

module.exports = { userToUID };
