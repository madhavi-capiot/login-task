const mysql = require('mysql');
const Joi = require('joi');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'****',
  database: 'Example'
})
connection.connect((err)=>{
  if(err) return err;
  console.log('Connected to MySQL');
});

function validateUser(user){
  const userSchema = Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
    role: Joi.string()
  });
  return Joi.validate(user,userSchema);
};

module.exports.dbConnector = connection;
module.exports.validate = validateUser; 

