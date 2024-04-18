const databaseConfig = require("../config/database");
const User = require("../models/User");
const mysql = require("mysql");
const { hash } = require("../utils/hashPass");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);

con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[REGISTRY]:".blue + " Connected ✅ \n".green);
});

const registryUser = (req, res) => {
  const { username, email, password, uid } = req.body;

  console.log("[REGISTRY]:".yellow + " Registry attempt ⚠️".yellow);

  const newUser = new User(username, email, password, uid);
  const sql = `insert into logins values (?, ?, ?, ?)`;

  con.query(
    sql,
    [newUser.uid, newUser.username, newUser.email, hash(newUser.password)],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log("[REGISTRY]:".red + " Failed to registry ⛔".red);
      } else {
        res.json({ message: "Success!" });
        console.log("[REGISTRY]:".blue + " Succcess ✅".green);
      }
    }
  );
};

module.exports = { registryUser };
