const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');

// Fungsi untuk membuat pasangan kunci RSA
function generateRSAKeyPair(username) {
  const { publicKey, privateKey } = awaitgenerateKeyPairSync('rsa', {
    modulusLength: 2048, // Panjang modulus kunci dalam bit
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return { publicKey, privateKey };
}

// Membuat pasangan kunci
const { publicKey, privateKey } = generateRSAKeyPair();

const keysDir = path.join(__dirname, '../secrets/keys');

// Membuat direktori jika belum ada
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}
// Menyimpan kunci publik dan privat ke file
fs.writeFileSync(path.join(keysDir, `public_key_${username}.pem`), publicKey);
fs.writeFileSync(path.join(keysDir, `private_key_${username}.pem`), privateKey);