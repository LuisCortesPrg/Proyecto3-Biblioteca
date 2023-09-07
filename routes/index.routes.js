const router = require("express").Router();
const express = require("express");
const Book = require("../models/Book.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const bookRouter = require("./book.routes");
router.use("/book", bookRouter);

const userRouter = require("./user.routes");
router.use("/user", userRouter);




module.exports = router;


