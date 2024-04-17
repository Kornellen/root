const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { createHash } = require("crypto");
const { log } = require("console");

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
  console.log("Login try");
  const formDatas = req.body;

  const username = formDatas.username;
  const password = hash(formDatas.password);

  var sql = `select password from logins where username = ?`;
  var dbHash = "";

  con.query(sql, [username], (err, result) => {
    if (result.length === 0) {
      res.json({ info: 401, err: "User doesn't exist" });
    } else {
      dbHash = `${result[0].password}`;

      if (password === dbHash) {
        return res.json({ info: 200, login: username });
      } else {
        return res.json({ info: 401, err: "Incorrect Password" });
      }
    }
  });
});

app.post("/userdata", (req, res) => {
  const data = req.body;

  const uid = data.uid;

  var sql =
    "SELECT dataType, dataData FROM `userdata` WHERE userID = ? and dataType not in ('config');";
  con.query(sql, [uid], async (err, result) => {
    err ? console.log(err) : await res.json(result);
  });
});

app.post("/adddata", (req, res) => {
  const data = req.body;

  const dataType = data.dataType;
  const datA = data.data;
  const uid = data.uid;

  var sql =
    "insert into userdata (userID, dataType, dataData) values (?, ?, ?)";

  con.query(sql, [uid, dataType, datA], (err, result) => {
    err ? res.json({ info: "err" }) : res.json({ info: "succes" });
  });
});

app.post("/updateuser", (req, res) => {
  const data = req.body;

  const newUser = data.newUser;
  const oldUser = data.oldUser;
  const newPassword = hash(data.newPass);
  const oldPassword = hash(data.oldPass);

  if (
    newPassword ===
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" &&
    newUser === ""
  ) {
    console.log("[INFO]: Nothing changed");
  } else if (newUser.length === 0) {
    var sql =
      "update `logins` set `password` = ? where `username` = ? and `password` = ?;";

    con.query(sql, [newPassword, oldUser, oldPassword], (err, result) => {
      err ? console.error(err) : console.log("[INFO]: Changed Password");
    });
  } else if (
    newPassword ===
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  ) {
    var sql =
      "update `logins` set `username` = ? where `username` = ? and `password` = ?;";
    con.query(sql, [newUser, oldUser, oldPassword], (err, result) =>
      err ? console.error(err) : console.log("[INFO]: Changed Username")
    );
  } else {
    var sql =
      "update `logins` set `username` = ?, `password` = ? where `username` = ? and `password` = ?;";
    con.query(
      sql,
      [newUser, newPassword, oldUser, oldPassword],
      (err, result) =>
        err ? console.error(err) : console.log("[INFO]: Changed everything")
    );
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
