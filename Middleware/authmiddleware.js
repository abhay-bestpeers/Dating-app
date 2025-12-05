const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const tokenFromCookie = req.cookies.jwtToken;
  
  const token = tokenFromCookie ;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
