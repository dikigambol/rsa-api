const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Struktural = db.define('struktural', {
    id_struktural: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_divisi: DataTypes.INTEGER,
    atasan: DataTypes.INTEGER
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Struktural;