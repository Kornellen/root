const mysql = require("mysql");
const databaseConfig = require("../config/database");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[USER DATA]:".blue + " Connected ✅ \n".green);
});

const userData = (req, res) => {
  const { uid } = req.body;

  console.log(
    "[USER DATA]:".yellow + " Attempting to load user datas ⚠️".yellow
  );

  var sql =
    "SELECT dataType, dataData FROM `userdata` WHERE userID = ? and dataType not in ('config');";
  con.query(sql, [uid], async (err, result) => {
    err
      ? console.log("[USER DATA]:".red + "Failed loading data".red, err)
      : (res.json(result),
        console.log("[USER DATA]:".blue + " Loaded ✅".green));
  });
};

module.exports = { userData };
