const { Sequelize } = require('sequelize');
const { config } = require('dotenv');
const mysql2 = require('mysql2');

config();

const db = new Sequelize("hrd_jwt_rsa", "root", "", {
    host: "localhost",
    dialect: 'mysql',
    dialectModule: mysql2,
    define: {
        timestamps: false
    },
    logging: console.log
});

(async () => {
    try {
        await db.authenticate();
    } catch (err) {
        console.error('Koneksi database gagal:', err);
    }
})();

module.exports = db;