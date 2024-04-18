const databaseConfig = require("../config/database");
const Data = require("../models/Data");
const mysql = require("mysql");

const con = mysql.createConnection(databaseConfig);
con.connect(async (err) => {
  err ? console.log(err) : console.log("[DEBUG]:Connected Add Data Endpoint");
});

const addData = (req, res) => {
  const { dataType, dataData, uid } = req.body;

  const data = new Data(dataType, dataData, uid);

  var sql =
    "insert into userdata (userID, dataType, dataData) values (?, ?, ?)";

  con.query(sql, [data.uid, data.dataType, data.dataData], (err, result) => {
    err ? res.json({ info: "err" }) : res.json({ info: "succes" });
  });
};

module.exports = { addData };
