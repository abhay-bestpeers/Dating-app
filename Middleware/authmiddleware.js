const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {


  const tokenFromCookie = req.cookies.jwtToken;


  const authHeader = req.header("Authorization");
  const tokenFromHeader = authHeader?.split(" ")[1];

  
  const token = tokenFromCookie || tokenFromHeader;

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
