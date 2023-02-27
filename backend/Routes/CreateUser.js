const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = "heloomynameisakshayjohncena";

router.post('/createUser', [
  body('name').isLength({ min: 5 }),
  body('email', 'invalid email').isEmail(),
  body('password', 'invalid password').isLength({ min: 5 })],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });
      res.send({ success: true })
    } catch (err) {
      console.log(err);
      res.send({ success: true })
    }

  });

router.post('/loginUser', [
  body('email', 'invalid email').isEmail(),
  body('password', 'invalid password').isLength({ min: 5 })],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.status(400).json({ errors: "This is mail not found" })
      }

      const pswdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pswdCompare) {
        return res.status(400).json({ errors: "Try logging with correct credientials" })
      }

      const data = {
        user:{
          id:userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret)

      return res.json({ success: true, authToken:authToken})

    } catch (err) {
      console.log(err);
      res.send({ error: err })
    }

  });

module.exports = router;