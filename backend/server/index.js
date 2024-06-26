const express = require("express");
const cors = require("cors");
var colors = require("colors");

colors.enable();

const addDataRoute = require("./routes/addData");
const loginRoute = require("./routes/loginRoutes");
const registryRoute = require("./routes/registryRoutes");
const uidtouserRoute = require("./routes/uidtouser");
const updateRoute = require("./routes/updateUser");
const dataRoute = require("./routes/userdata");
const usertouidRoute = require("./routes/usertouid");
const verifyRoute = require("./routes/verifyUser");

const app = express();
const port = 5175;

app.use(express.json());
app.use(cors());

const routes = [
  addDataRoute,
  loginRoute,
  registryRoute,
  uidtouserRoute,
  updateRoute,
  dataRoute,
  usertouidRoute,
  verifyRoute,
];

app.use("/api", routes);

app.listen(port, () => {
  console.log(
    `[INFO]:`.gray +
      ` APP IS LISTENING ON: `.gray +
      `http://localhost:${port} 🔧 \n`.bold.grey
  );
});
