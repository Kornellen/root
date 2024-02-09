const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
const $port = 5174;

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const formDatas = req.body;

  //console.log(formDatas);

  const username = formDatas.username;
  const password = formDatas.password;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Profiles",
  });

  con.connect(async (err) => {
    err ? console.log(err) : console.log("connected");
    var sql = `select * from logins where username = '${username}' and password = '${password}'`;
    con.query(sql, (err, result) => {
      console.log(result);

      if (result.length === 0) {
        console.log("[ERROR]");
        res.json({ info: 401 });
      } else {
        result.forEach((element) => {
          console.log(
            `Login: ${element.username}, Password: ${element.password}`
          );
        });
        res.json({ info: 200 });
      }
    });
  });
});

app.listen($port, () => {
  console.log(`App works on: ${$port}`);
});
