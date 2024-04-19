const databaseConfig = require("../config/database");
const Data = require("../models/Data");
const mysql = require("mysql");
var colors = require("colors");

colors.enable();

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err
    ? console.log(err.red)
    : console.log(`[ADD DATA]:`.blue + " Connected ✅ \n".green);
});

const addData = (req, res) => {
  const { dataType, dataData, uid } = req.body;

  const data = new Data(dataType, dataData, uid);

  console.log("[ADD DATA]: Attempting to add data ⚠️".yellow);

  var sql =
    "insert into userdata (userID, dataType, dataData) values (?, ?, ?)";

  con.query(sql, [data.uid, data.dataType, data.dataData], (err, result) => {
    err
      ? (res.json({ info: "err" }),
        console.log("[ADD DATA]: Failed to add data ⛔".red + "\n"))
      : (res.json({ info: "succes" }),
        console.log("[ADD DATA]:".blue + " Success ✅".green + "\n"));
  });
};

module.exports = { addData };
