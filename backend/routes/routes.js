import { response } from "express";

const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// Sign up a user
router.post("/signup", (req, res) => {
  const signedUpUser = new userModel({
    email: req.body.email,
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
