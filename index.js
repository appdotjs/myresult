const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const students = require("./routes/students");
const schoolNames = require("./routes/schoolNames");
const teachers = require("./routes/teachers");
const auth = require("./routes/auth");

// if (!config.get("jwtPrivateKey")) {
//   console.error("Fatal error occured, private key not set");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://localhost/myresult")
  .then(() => console.log("connected to mongodb...."))
  .catch((err) =>
    console.error("Could not connect to mongodb database...", err)
  );

app.use(express.json());
app.use("/api/students", students);
app.use("/api/schoolnames", schoolNames);
app.use("/api/teachers", teachers);
app.use("/api/auth", auth);

app.listen(3001, () => console.log("Listening to app"));
