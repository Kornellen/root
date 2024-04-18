const databaseConfig = require("../config/database");
const User = require("../models/User");
const mysql = require("mysql");
const { hash } = require("../utils/hashPass");

const con = mysql.createConnection(databaseConfig);

con.connect(async (err) => {
  err ? console.log(err) : console.log("[DEBUG]:Connected Registry Endpoint");
});

const registryUser = (req, res) => {
  const { username, email, password, uid } = req.body;
  const newUser = new User(username, email, password, uid);
  const sql = `insert into logins values (?, ?, ?, ?)`;

  con.query(
    sql,
    [newUser.uid, newUser.username, newUser.email, hash(newUser.password)],
    (err, result) => {
      err
        ? res.status(500).json({ error: "Internal Server Error" })
        : res.json({ message: "Success!" });
    }
  );
};

module.exports = { registryUser };
