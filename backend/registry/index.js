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

app.listen(port, () => {
  console.log("App started on:", port);
});
