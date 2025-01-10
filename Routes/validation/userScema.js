const Joi = require("joi");

function userSchema(data){

const schema = Joi.object({
    
  name: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  


});
    const valid = schema.validate(data);
    return valid
}


module.exports = userSchema