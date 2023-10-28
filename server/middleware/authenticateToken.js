const jwt = require("jsonwebtoken");

// TODO: kick out user if token has expired
function checkTokenExpired(token) {}

function authenticateToken(req, res, next) {
  console.log("authenticating token...");
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
