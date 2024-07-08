const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

exports.fakeToken = async (req, res) => {
    try {
        if (req.params.type == 'RSA') {
            const KeyPath = path.resolve(__dirname, '../secrets/keys', `private_key_${req.params.nopeg}.pem`);
            const privateKey = await fs.readFile(KeyPath, { encoding: "utf8" });

            const { nopeg, name, role } = req.body;
            const payload = { nopeg: nopeg, name: name, role: role, claim: "created for HRD Asia" };
            const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '12h' });
            return res.status(200).json({ token: token });
        } else if (req.params.type == 'HMAC') {
            const { nopeg, name, role } = req.body;
            const payload = { nopeg: nopeg, name: name, role: role, claim: "created for HRD Asia" };
            const token = jwt.sign(payload, 'hrdtoken1234', { algorithm: 'HS256', expiresIn: '12h' });
            return res.status(200).json({ token: token });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};