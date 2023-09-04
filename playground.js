const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function run() {
  const hashed = await bcrypt.hash("123456", await bcrypt.genSalt(10));

  console.log(hashed);

  const validPassword = await bcrypt.compare("12345", hashed);

  console.log(validPassword);
  const token = jwt.sign({ _id: "123456" }, "jwtPrivateKey");

  console.log(token);
}

run();
