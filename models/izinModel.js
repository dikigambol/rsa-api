const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Izin = db.define('izin_pegawai', {
    id_izin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    no_pegawai: DataTypes.INTEGER,
    tgl_izin: DataTypes.DATEONLY,
    keterangan: DataTypes.STRING,
    status_izin: DataTypes.INTEGER
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Izin;