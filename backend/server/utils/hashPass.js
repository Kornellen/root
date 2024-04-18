const { createHash } = require("crypto");

const hash = (str) => {
  return createHash("sha256").update(str).digest("hex");
};

module.exports = { hash };
