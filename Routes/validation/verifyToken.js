const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.status(400).send("Token not found");

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN,(err,user)=>{
      if(err) res.status(401).send("token is not valid")
      req.user = user 
      next();
    });
    // req.user = verified; // Attach the decoded token data to `req`
  } catch (error) {
    res.status(400).send("you are not authorized");
  }
}

module.exports = verifyToken;
