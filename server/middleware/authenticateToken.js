const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  console.log("authenticating token...");
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401); 

//TODO: check if token has expired

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;