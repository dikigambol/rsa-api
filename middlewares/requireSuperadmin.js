const jwt = require("jsonwebtoken");
const fs = require('fs').promises;
const path = require('path');
const { jwtDecode } = require('jwt-decode');
const { config } = require("dotenv");
config();

exports.requireSuperadmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const nopeg = jwtDecode(token).nopeg;
    const publicKeyPath = path.resolve(__dirname, '../secrets/keys', `public_key_${nopeg}.pem`);
    const publicKey = await fs.readFile(publicKeyPath, { encoding: 'utf8' });
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
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
        message: "Unauthorized: Bearer Needed",
        status: 401,
      });
      return;
    }
  } catch {
    res.status(401).json({
      message: "Unauthorized: Token Null",
      status: 401,
    });
    return;
  }
};
