const mysql = require("mysql");
const databaseConfig = require("../config/database");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[USER DATA]:".blue.green + " Connected ✅ \n".green);
});

const userData = (req, res) => {
  const { uid } = req.body;

  var sql =
    "SELECT dataType, dataData FROM `userdata` WHERE userID = ? and dataType not in ('config');";
  con.query(sql, [uid], async (err, result) => {
    err ? console.log(err) : await res.json(result);
  });
};

module.exports = { userData };
