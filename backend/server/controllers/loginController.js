const databaseConfig = require("../config/database");
const mysql = require("mysql");
const { hash } = require("../utils/hashPass");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[LOGIN]:".blue + " Connected ✅ \n".green);
});

const loginUser = (req, res) => {
  const { username, password } = req.body;

  var sql = `select password from logins where username = ?`;
  var dbHash = "";

  con.query(sql, [username], (err, result) => {
    if (result.length === 0) {
      res.json({ info: 401, err: "User doesn't exist" });
    } else {
      dbHash = `${result[0].password}`;

      if (hash(password) === dbHash) {
        res.json({ info: 200, login: username });
      } else {
        res.json({ info: 401, err: "Incorrect Password" });
      }
    }
  });
};

module.exports = { loginUser };
