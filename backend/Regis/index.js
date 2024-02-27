const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5175;

app.use(express.json());
app.use(cors());

app.post("/registry", (req, res) => {
  const formDatas = req.body;
  console.log("Datas received:", formDatas);

  const username = formDatas.username;
  const email = formDatas.email;
  const password = formDatas.password;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Profiles",
  });

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

  localStorage.setItem("username", username);

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
          res.json({ info: 200, login: element.username });
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log("App started on:", port);
});
