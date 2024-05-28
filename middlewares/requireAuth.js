const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(401).json({
          message: "Unauthorized: Invalid token",
          status: 401,
        });
        return;
      }
      next();
    });
  } else {
    res.status(401).json({
      message: "Unauthorized: Invalid token",
      status: 401,
    });
    return;
  }
};
