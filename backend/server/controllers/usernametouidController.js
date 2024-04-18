const mysql = require("mysql");
const databaseConfig = require("../config/database");
const { hash } = require("../utils/hashPass");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[USERNAME => UID]:".blue + " Connected ✅ \n".green);
});

const userToUID = (req, res) => {
  const { username, password } = req.body;

  console.log(
    "[USERNAME => UID]:".yellow +
      " Attempting to convert Username => UID ⚠️".yellow
  );

  var sql = "select userID from `logins` where username = ? and password = ?";

  con.query(sql, [username, hash(password)], (err, result) => {
    err
      ? console.log(
          "[USERNAME => UID]: Failed to convert Username => UID".red,
          err
        )
      : (res.json(result),
        console.log("[USERNAME => UID]:".blue + " Success ✅".green));
  });
};

module.exports = { userToUID };
