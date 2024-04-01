const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { createHash } = require("crypto");

const app = express();
const port = 5175;

app.use(express.json());
app.use(cors());

const hash = (str) => {
  return createHash("sha256").update(str).digest("hex");
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Profiles",
});

con.connect(async (err) => {
  err ? console.log(err) : console.log("connected");
});

app.post("/registry", (req, res) => {
  const formDatas = req.body;

  const username = formDatas.username;
  const email = formDatas.email;
  const password = hash(formDatas.password);
  const uid = formDatas.uid;
  var sql = `insert into logins values (?, ?, ?, ?)`;

  con.query(sql, [uid, username, email, password], (err, result) => {
    err ? console.log(err) : res.json({ message: "Success!" });
  });
});

app.post("/login", (req, res) => {
  const formDatas = req.body;

  const username = formDatas.username;
  const password = hash(formDatas.password);

  var sql = `select password from logins where username = ?`;
  var dbHash = "";

  con.query(sql, [username], (err, result) => {
    if (result.length === 0) {
      console.log("[ERROR] Uzytkownik nie istnieje");
      res.json({ info: 401 });
    } else {
      dbHash = `${result[0].password}`;

      if (password === dbHash) {
        console.log("[INFO]: Sukces");
        return res.json({ info: 200, login: username });
      } else {
        console.log("[ERROR]: Hasla nie takie same");
        return res.json({ info: 401 });
      }
    }
  });
});

// app.post("/userdata", (req, res) => {
//   const data = req.body;

//   console.log(data);
//   const username = data.userID;

//   var sql =
//     "SELECT dataType, dataData FROM `userdata` WHERE userID = ? and dataType not in ('config');";
//   con.query(sql, [username], async (err, result) => {
//     console.log(result);
//     err ? console.log(err) : await res.json(result);
//   });
// });

app.post("/updateuser", (req, res) => {
  const data = req.body;

  const newUser = data.newUser;
  const oldUser = data.oldUser;
  const newPassword = data.newPass;
  const oldPassword = data.oldPass;

  console.log(newUser, oldUser, newPassword, oldPassword);

  if (newUser.length === 0) {
    var sql =
      "update `logins` set `password` = ? where `username` = ? and `password` = ?;";

    con.query(sql, [newPassword, oldUser, oldPassword], (err, result) => {
      err ? console.error(err) : console.log(result);
    });
  }

  if (newPassword.length === 0) {
    var sql =
      "update `logins` set `username` = ? where `username` = ? and `password` = ?;";
    con.query(sql, [newUser, oldUser, oldPassword], (err, result) =>
      err ? console.error(err) : console.log(result)
    );

    var sql2 = "UPDATE `userdata` SET `user`= ? WHERE user = ?;";

    con.query(sql2, [newUser, oldUser], (err, result) => {
      err ? console.error(err) : console.log(result);
    });
  } else {
    var sql =
      "update `logins` set `username` = ?, `password` = ? where `username` = ? and `password` = ?;";
    con.query(
      sql,
      [newUser, newPassword, oldUser, oldPassword],
      (err, result) => (err ? console.error(err) : console.log(result))
    );

    var sql2 = "UPDATE `userdata` SET `user`= ? WHERE user = ?;";

    con.query(sql2, [newUser, oldUser], (err, result) => {
      err ? console.error(err) : result;
    });
  }
});

app.post("/usernametouid", (req, res) => {
  const username = req.body.username;
  const password = hash(req.body.password);

  var sql = "select userID from `logins` where username = ? and password = ?";

  con.query(sql, [username, password], (err, result) => {
    err ? console.error(err) : res.json(result);
  });
});

app.post("/uidtousername", (req, res) => {
  const uid = req.body.userID;

  var sql = "select username from `logins` where userID = ?;";
  con.query(sql, [uid], (err, result) => {
    err ? console.error(err) : res.json(result);
  });
});

app.listen(port, () => {
  console.log("App started on:", port);
});
