const mysql = require("mysql");
const databaseConfig = require("../config/database");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[UID => USERNAME]:".blue + " Connected ✅ \n".green);
});

const uidToUser = (req, res) => {
  const { uid } = req.body;

  console.log(
    "[UID => USERNAME]:".yellow +
      " Attempting to convert UID => Username ⚠️".yellow
  );

  var sql = "select username from `logins` where userID = ?;";
  con.query(sql, [uid], (err, result) => {
    err
      ? console.log(
          "[UID => USERNAME]: " + "Failed to convert UID => USERNAME ⛔",
          err
        )
      : (res.json(result),
        console.log("[UID => USERNAME]:".blue + " Successed convert ✅".green));
  });
};

module.exports = { uidToUser };
