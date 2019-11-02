const {
  dbConnector,
  validate
} = require('../Models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore')


router.post('/login', async (req, res) => {
  console.log('Hello');
  var result = await dbConnector.query('SELECT * FROM persons where email = ?', req.body.email, async (err, rows) => {
    if (err) return err;

    if (rows.length >= 1) {
      const validPassword = await bcrypt.compare(req.body.password, rows[0].password);
      if (!validPassword) {
        return res.status('400').send('Wrong Password');
      } else {
        const token = jwt.sign({
          id: rows.id,
          role: rows.role
        }, 'jwtPrivateKey');
        var resultSent = {
          name: rows[0].name,
          email: rows[0].email,
          role: rows[0].role,
          token: token
        }
        return res.status('200').send(resultSent);
      }
    } else {
      return res.status('400').send('Wrong email or wrong password');
    }
  });

});

router.post('/createUser', async (req, res) => {

  var validUser = validate(req.body);
  if (validUser.error) return res.status(400).send(validUser.error.details[0].message);

 await dbConnector.query('SELECT * FROM persons where email = ?', req.body.email, async (err, rows) => {
    if (err) return err;
    if (rows.length >= 1) return res.status('400').send('User already exists');
    else{
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
      var salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    
    
      await dbConnector.query('INSERT INTO persons SET ?', user, (err, result) => {
        if(err) res.end(err);
        res.status(200).send(result);
      });
    }
  });

  


});

module.exports = router;