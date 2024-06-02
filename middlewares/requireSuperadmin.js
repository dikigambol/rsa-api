const jwt = require("jsonwebtoken");
const fs = require('fs').promises;
const path = require('path');
const { config } = require("dotenv");
config();

exports.requireSuperadmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const publicKeyPath = path.resolve(__dirname, '../function/keys', 'public_key.pem');
  const publicKey = await fs.readFile(publicKeyPath, { encoding: 'utf8' });

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      if (decoded.role === "superadmin") {
        next();
      } else {
        res.status(401).json({
          message: "Unauthorized: Access Denied",
          status: 401,
        });
        return;
      }
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized: Invalid token",
        status: 401,
      });
      return;
    }
  } else {
    res.status(401).json({
      message: "Unauthorized: Invalid token",
      status: 401,
    });
    return;
  }
};
