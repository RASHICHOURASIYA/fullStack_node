const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: Token is not provided or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      req.user = decoded; 
      next(); 
    }
  });
};

module.exports = authMiddleware;
