const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Divisi = db.define('divisi', {
    id_divisi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    ket_divisi: DataTypes.INTEGER
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Divisi;