require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const path = require("path");
const connectDb = require("./db/db");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/member", require("./routes/memberRoutes"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Server is up and running on the port ${port}`.magenta.underline.bold
      )
    );
  })
  .catch((err) => console.log(err));
