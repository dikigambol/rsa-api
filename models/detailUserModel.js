const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const DetailUser = db.define('detail_user', {
    id_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    tgl_masuk: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    email: DataTypes.STRING,
    alamat_domisili: DataTypes.STRING,
    alamat_ktp: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATEONLY,
    status_nikah: DataTypes.STRING,
    tgl_keluar: DataTypes.DATEONLY,
    pendidikan: DataTypes.STRING,
    posisi: DataTypes.STRING,
    divisi: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    no_pegawai: DataTypes.INTEGER
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = DetailUser;