const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const User = db.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    no_pegawai: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
    default_password: DataTypes.STRING,
    level_user: DataTypes.STRING
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = User;