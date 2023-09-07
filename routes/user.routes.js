const router = require("express").Router();
const express = require("express");
const Book = require("../models/Book.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated.js");



//home

router.get("/home", isAuthenticated, async (req, res, next) => {
    try {
      // const userId = req.params.id;
      const user = req.payload._id;
      const userData=await  User.findById(user)
  
      
      
  
  
      res.json({ userData });
    } catch (error) {
      next(error);
    }
  });


  //perfil

router.get("/perfil", isAuthenticated, async (req, res, next) => {
    try {
      // const userId = req.params.id;
      const user = req.payload._id;
      const userData=await  User.findById(user)
  
      
      
  
  
      res.json({ userData });
    } catch (error) {
      next(error);
    }
  });


  //editarperfil

router.patch("/editarperfil", isAuthenticated, async (req, res, next) => {
    try {
     const elId=req.payload._id
      const user = req.body.username;
      
      await User.findByIdAndUpdate(elId , {username:user})
  
  
      res.json({ username: user.username, email: user.email });
    } catch (error) {
      next(error);
    }
  });




  module.exports = router;