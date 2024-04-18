const mysql = require("mysql");
const databaseConfig = require("../config/database");

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[DEBUG]:Connected UID -> Username Endpoint");
});

const uidToUser = (req, res) => {
  const { uid } = req.body;

  var sql = "select username from `logins` where userID = ?;";
  con.query(sql, [uid], (err, result) => {
    err ? console.error(err) : res.json(result);
  });
};

module.exports = { uidToUser };
