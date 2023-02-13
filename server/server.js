require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const connectDb = require("./db/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/member", require("./routes/memberRoutes"));

connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Server is up and running on the port ${port}`.magenta.underline.bold
      )
    );
  })
  .catch((err) => console.log(err));
