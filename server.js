const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

//use schema
const AccountModel = require("./models/account");

//router
const AccountRouter = require("./routers/account");

env.config();

const app = express();
app.use(cors());

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// app.post("/register", async (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // const account = new AccountModel({ username, password });
//   // await account.save();
//   AccountModel.create({ username, password })
//     .then((data) => {
//       // res.status(200).json({ username, password });
//       // console.log("tao tai khoan thanh cong");
//       res.status(200).json("tao tai khoan thanh cong");
//       console.log(data);
//     })
//     .catch((err) => {
//       res.status(500).json("tao tai khoan that bai");
//       console.log("tao tai khoan that bai", err);
//     });
// });

// app.post("/login", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   AccountModel.findOne({
//     username,
//     password,
//   })
//     .then((data) => {
//       if (data) {
//         res.status(200).json("Dang nhap thanh cong");
//       } else {
//         res.status(400).json("Tai khoan chua dang ky");
//       }
//     })
//     .catch((err) => {
//       res.status(500).json("co loi ben sever: " + err);
//     });
// });

app.use("/api/account/", AccountRouter);

const port = process.env.PORT ? process.env.PORT : 8080;
const conn = process.env.CONN ? process.env.CONN : "";

try {
  mongoose
    .connect(conn, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(console.log("connect successfully: " + conn))
    .then(
      app.listen(port, (req, res) => {
        console.log(`server is runing at port: http://localhost:${port}`);
      })
    );
} catch (error) {
  console.log(error);
}
