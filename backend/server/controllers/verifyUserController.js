const mysql = require("mysql");
const databaseConfig = require("../config/database");
const con = mysql.createConnection(databaseConfig);
const fs = require("fs");

con.connect(async (err) => {
  err
    ? console.log(err)
    : console.log("[VERIFY]:".blue + " Connected ✅ \n".green);
});

const verifyUser = (req, res) => {
  const userEmail = req.query.email;
  var sql = `update logins set verified = 1 where email = ?`;

  con.query(sql, [userEmail], (err) => {
    err
      ? res.json({ error: err })
      : fs.readFile("templates/verify.html", "utf8", (error, verPage) => {
          if (error) {
            res.send("Loding file error");
            console.log("[VERIFY]: Success".green);
          } else {
            res.send(verPage), console.log("[VERIFY]: Success".green);
          }
        });
  });
};

module.exports = { verifyUser };
