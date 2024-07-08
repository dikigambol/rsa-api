const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

exports.requireSuperadminHMAC = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                const decoded = jwt.verify(token, "hrdtoken1234", { algorithms: ['HS256'] });
                console.warn(decoded)
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
