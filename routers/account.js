const express = require("express");
const AccountModel = require("../models/account");

const router = express.Router();

// // lay du lieu tu db
// router.get("/", (req, res, next) => {});

// //them du lieu vao db
// router.post("/", (req, res, next) => {});

// //update du lieu vao db
// router.put("/", (req, res, next) => {});

// //xoa du lieu vao db
// router.delete("/", (req, res, next) => {});

//lay toan bo du lieu db
router.get("/", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

// register
router.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // const account = new AccountModel({ username, password });
  // await account.save();
  AccountModel.create({ username, password })
    .then((data) => {
      // res.status(200).json({ username, password });
      // console.log("tao tai khoan thanh cong");
      res.status(200).json("tao tai khoan thanh cong");
      console.log(data);
    })
    .catch((err) => {
      res.status(500).json("tao tai khoan that bai");
      console.log("tao tai khoan that bai", err);
    });
});

//login
router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  AccountModel.findOne({
    username,
    password,
  })
    .then((data) => {
      if (data) {
        res.status(200).json("Dang nhap thanh cong");
      } else {
        res.status(400).json("Tai khoan chua dang ky");
      }
    })
    .catch((err) => {
      res.status(500).json("co loi ben sever: " + err);
    });
});

//update du lieu trong db
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;

  AccountModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => {
      if (data) {
        res.status(200).json("update password thanh cong");
      } else {
        res.status(400).json("khong tim thay id tai khoan nay");
      }
    })
    .catch((err) => {
      res.status(500).json("Loi tu server");
    });
});

//xoa du lieu trong db
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  AccountModel.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.status(200).json("xoa tai khoan thanh cong");
      } else {
        res.status(400).json("khong tim tai khoan can xoa");
      }
    })
    .catch((err) => {
      res.status(500).json("Loi tu server");
    });
});

module.exports = router;
