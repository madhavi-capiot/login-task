const express = require('express');
const mysql = require ('mysql');
const auth = require('./Routes/login');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',auth);

const port = '3000';
app.listen(port,(err)=>{
  if(err) return err;
  console.log(`Listening to ${port}`);
});

