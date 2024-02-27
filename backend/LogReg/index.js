const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5175;

app.use(express.json());
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Profiles",
});

app.post("/registry", (req, res) => {
  const formDatas = req.body;
  console.log("Datas received:", formDatas);

  const username = formDatas.username;
  const email = formDatas.email;
  const password = formDatas.password;

  con.connect(async (err) => {
    err ? console.log(err) : console.log("connected");
    var sql = `insert into logins values ('${username}', '${email}', '${password}')`;
    await con.query(sql, (err, result) => {
      err ? console.log(err) : console.log("Inserted!");
    });
  });
  res.json({ message: "Success!" });
});

app.post("/login", (req, res) => {
  const formDatas = req.body;

  //console.log(formDatas);

  const username = formDatas.username;
  const password = formDatas.password;

  con.connect(async (err) => {
    err ? console.log(err) : console.log("connected");
    var sql = `select * from logins where username = ? and password = ?`;
    con.query(sql, [username, password], (err, result) => {
      //console.log(result);

      if (result.length === 0) {
        console.log("[ERROR]");
        res.json({ info: 401 });
      } else {
        result.forEach((element) => {
          /*console.log(
            `Login: ${element.username}, Password: ${element.password}`
          );*/
          res.json({ info: 200, login: element.username });
        });
      }
    });
  });
});

app.post("/localLog", (req, res) => {
  const data = req.body;

  const username = data.username;

  con.connect(async (err) => {
    err ? console.log(err) : console.log("connected");
    var sql = "select password from logins where username = ?;";
    con.query(sql, [username], (err, result) => {
      err ? console.log(err) : res.json({ pass: result });
    });
  });
});

app.listen(port, () => {
  console.log("App started on:", port);
});
