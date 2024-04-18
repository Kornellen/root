const mysql = require("mysql");
const { hash } = require("../utils/hashPass");
const databaseConfig = require("../config/database");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[UPDATE USER]:".blue + " Connected ✅ \n".green);
});

const updateuser = (req, res) => {
  const { oldUser, newUser, oldPassword, newPassword } = req.body;

  if (
    hash(newPassword) ===
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" &&
    newUser === ""
  ) {
    console.log("[INFO]: Nothing changed");
  } else if (newUser.length === 0) {
    var sql =
      "update `logins` set `password` = ? where `username` = ? and `password` = ?;";

    con.query(
      sql,
      [hash(newPassword), oldUser, hash(oldPassword)],
      (err, result) => {
        err ? console.error(err) : console.log("[INFO]: Changed Password");
      }
    );
  } else if (
    hash(newPassword) ===
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  ) {
    var sql =
      "update `logins` set `username` = ? where `username` = ? and `password` = ?;";
    con.query(sql, [newUser, oldUser, hash(oldPassword)], (err, result) =>
      err ? console.error(err) : console.log("[INFO]: Changed Username")
    );
  } else {
    var sql =
      "update `logins` set `username` = ?, `password` = ? where `username` = ? and `password` = ?;";
    con.query(
      sql,
      [newUser, hash(newPassword), oldUser, hahs(oldPassword)],
      (err, result) =>
        err ? console.error(err) : console.log("[INFO]: Changed everything")
    );
  }
};

module.exports = { updateuser };
